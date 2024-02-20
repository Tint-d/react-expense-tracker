import { useState } from "react";

const useDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    toggleDropdown,
    closeDropdown,
  };
};

export default useDropdown;
