import { useContext } from "react";
import { StoreContext } from "../stores/Store";

export function useStore() {
    return useContext(StoreContext);
}