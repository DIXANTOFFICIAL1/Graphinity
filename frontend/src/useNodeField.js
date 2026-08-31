import { useStore } from "./store";

export default function useNodeField(id, data, field, defaultValue) {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const value =
    data?.[field] !== undefined
      ? data[field]
      : defaultValue;

  const setValue = (newValue) => {
    updateNodeField(id, field, newValue);
  };

  return [value, setValue];
}