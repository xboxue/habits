import { useEffect, useRef } from "react";
import { Keyboard } from "react-native";

export const useKeyboard = ({
  keyboardDidShow = () => {},
  keyboardDidHide = () => {}
}) => {
  const keyboardDidShowListener = useRef(null);
  const keyboardDidHideListener = useRef(null);

  useEffect(() => {
    keyboardDidShowListener.current = Keyboard.addListener(
      "keyboardDidShow",
      keyboardDidShow
    );
    keyboardDidHideListener.current = Keyboard.addListener(
      "keyboardDidHide",
      keyboardDidHide
    );

    return () => {
      keyboardDidShowListener.current.remove();
      keyboardDidHideListener.current.remove();
    };
  }, []);
};
