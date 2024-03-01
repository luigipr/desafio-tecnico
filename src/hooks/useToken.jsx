import { useContext } from "react";
import { TokenContext } from "../contexts/TokenContext";

export default function useToken() {
  return useContext(TokenContext);
}