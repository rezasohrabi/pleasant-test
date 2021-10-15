import { useEffect, useState } from 'react';

const useCopyToClipboard = (textToCopy, successMessage = 'Successfull') => {
  const [doCopy, setDoCopy] = useState(false);

  useEffect(() => {
    if (doCopy) {
      if (!navigator.clipboard) {
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        textarea.style.top = '0';
        textarea.style.left = '0';
        textarea.style.position = 'fixed';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        try {
          const success = document.execCommand('copy');
        } catch (error) {
          console.log('fallback', error);
        }
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
