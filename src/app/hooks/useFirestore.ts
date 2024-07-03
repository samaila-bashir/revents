import { useCallback, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { GenericActions } from "../store/slices/genericSlice";
import { DocumentData, onSnapshot, collection } from "firebase/firestore";
import { db } from "../config/firebase";

type ListenerState = {
  name?: string;
  unsubscribe: () => void;
};

export const useFireStore = <T>(path: string) => {
  const listenersRef = useRef<ListenerState[]>([]);

  useEffect(() => {
    let listenerRefValue: ListenerState[] | null = null;

    if (listenersRef.current) {
      listenerRefValue = listenersRef.current;
    }

    return () => {
      if (listenerRefValue) {
        listenerRefValue.forEach((listener) => {
          listener.unsubscribe();
        });
      }
    };
  }, []);

  const dispatch = useDispatch();

  const loadCollection = useCallback(
    (actions: GenericActions<T>) => {
      dispatch(actions.loading());

      const query = collection(db, path);

      const listener = onSnapshot(query, {
        next: (querySnapshot) => {
          const data: DocumentData = [];
          if (querySnapshot.empty) {
            dispatch(actions.success([] as unknown as T));
            return;
          }
          querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() });
          });
          dispatch(actions.success(data as unknown as T));
        },
        error: (error) => {
          dispatch(actions.error(error.message));
          console.log("Collection error", error.message);
        },
      });

      listenersRef.current.push({ name: path, unsubscribe: listener });
    },
    [dispatch, path]
  );

  return { loadCollection };
};
