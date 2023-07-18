import { useEffect } from "react";

const usePageTitle = (title) => {
  useEffect(() => {
    const origTitle = document.title;
    document.title = title;

    //Restore to original title on unmount
    return () => (document.title = origTitle);
  }, [title]);
};

export default usePageTitle;
