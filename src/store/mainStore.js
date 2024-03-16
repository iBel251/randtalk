import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useMainStore = create(
  devtools(
    (set) => ({
      userData: null,
      preferenceData: null,
      setUserData: (data) => set(() => ({ userData: data })),
      setPreferenceData: (data) => set(() => ({ preferenceData: data })),
    }),
    "MainStore" // Name used for debugging with Redux DevTools
  )
);

// Modified persistData function to accept a name parameter
const persistData = (store, name) => {
  const persistedData = localStorage.getItem(name);

  if (persistedData) {
    store.setState(JSON.parse(persistedData));
  }

  store.subscribe((snapshot) => {
    localStorage.setItem(name, JSON.stringify(snapshot));
  });
};

// Pass a unique name for localStorage key when calling persistData
persistData(useMainStore, "UniqueProjectMainStore");

export default useMainStore;
