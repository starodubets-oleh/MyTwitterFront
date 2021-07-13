import { useEffect } from 'react';

export const windowScreensShouldBePreloaded = 0.4;

const useScrollLoad = (nextPage) => {
  useEffect(
    () => {
        const handleScroll = () => {
          const docHeight = document.documentElement.offsetHeight;
          const viewPortHeight = window.innerHeight;
          
          const viewedHeight = viewPortHeight + document.documentElement.scrollTop;
          const leftToTheBottom = Math.abs(docHeight - viewedHeight);
          
          if (leftToTheBottom < viewPortHeight * windowScreensShouldBePreloaded ) {
            nextPage();
          }
        };
        
        document.addEventListener('scroll', handleScroll);
        
        return () => {
          document.removeEventListener('scroll', handleScroll);
        };
    },
    [ nextPage ]
  );
};

export default useScrollLoad;
