import { useEffect, useState } from 'react';

const useCopyToClipboard = (textToCopy, successMessage = 'Successfull') => {
  const [doCopy, setDoCopy] = useState(false);

  useEffect(() => {
    if (doCopy) {
      if (!navigator.clipboard) {
        console.error('Error: navigator is undefined');
      } else {
        navigator.clipboard
          .writeText(textToCopy)
          .then(() => {
            alert(successMessage);
            setDoCopy(false);
          })
          .catch((error) => {
            console.error('Error occured while copying to clipboard');
          });
      }
    }
  }, [doCopy]);

  const copyToClipboard = () => {
    setDoCopy(true);
  };

  return copyToClipboard;
};

export default useCopyToClipboard;
