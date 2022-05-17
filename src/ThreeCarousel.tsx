import './App.css';
import styles from './ThreeCarousel.scss'
import { registerVevComponent } from '@vev/react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import left from '../assets/left.svg';
import right from '../assets/right.svg';



function ThreeCarousel({items, tileGap}) {
  const carRef = useRef<HTMLDivElement>(null);
  const figureRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const [currImageState, setCurrImage] = useState<number>(0);

  useEffect(() => {
    var root = carRef.current;

    var figure = root?.querySelector('figure') as HTMLElement;
    var images = figure.children;
    var numImages = images.length
    let theta =  2 * Math.PI / numImages;
    let gap = tileGap;
    setupCarousel(numImages, parseFloat( getComputedStyle(images[0]).width) );


    function setupCarousel(numImages: number, imgWidth: number) {
      let	apothem = imgWidth / (2 * Math.tan(Math.PI / numImages));
      figure.style.transformOrigin = `50% 50% ${- apothem}px`;
  
      for (var i = 0; i < numImages; i++)
        images[i].style.padding = `${gap}px`;
      for (i = 1; i < numImages; i++) {
        images[i].style.transformOrigin = `50% 50% ${- apothem}px`;
        images[i].style.transform = `rotateY(${i * theta}rad)`;
      }
      
      let currImage = 0
      rotateCarousel(currImage);
    }

  }, []);


  function rotateCarousel(imageIndex: number) {
    let fig = figureRef.current;
    let numImages = fig?.children.length
    let theta =  numImages ? 2 * Math.PI / numImages : 0;
    fig.style.transform = `rotateY(${imageIndex * -theta}rad)`;
  }

  function handlePrev() {
    let newIndex = currImageState-1
    setCurrImage(newIndex);
    rotateCarousel(newIndex)
    
  }

  function handleNext() {
    let newIndex = currImageState+1
    setCurrImage(newIndex);
    rotateCarousel(newIndex)
  }




  return (
    <div ref={carRef} className={styles.carousel}>
      <figure ref={figureRef}>
        {items.length>0 && items.map((item, index) => (
          <div className={styles.tileDiv}>
            <div className={`${styles.tileContent} tile`} style={{ "backgroundImage" : "url('" + item.img.url + "')" }} onClick={() => rotateCarousel(index)}>
              <div className={`${styles.overlay} overlay`}></div>
              <h1 className='title'>{item.title}</h1>
              <p className='description'>{item.description}</p>
            </div>
          </div>
        ))}
      </figure>
      <nav ref={navRef}>
        <img className={`${styles.icon} nav`} onClick={handlePrev} src={left} />
        <img className={`${styles.icon} nav`} onClick={handleNext} src={right} />
      </nav>
    </div>
  );
}



registerVevComponent(ThreeCarousel, {
    name: "3D Carousel",
    knobs: {
      ['.tile']: ['border', 'border-radius', 'padding'],
      ['.title']: ['font-family', 'font-size', 'color', 'font-weight', 'letter-spacing', 'line-height'],
      ['.description']: ['font-family', 'font-size', 'color', 'font-weight', 'letter-spacing', 'line-height', 'text-align'],
      ['.overlay']: ['background']
    },
    props: [
      {
        type: 'number',
        name: 'tileGap',
        title: 'Tile gap (px)',
        initialValue: 60
      },
      {
        type: 'array',
        name: 'items',
        of: [
          {
            type: 'image',
            name: 'img',
          },
          {
            type: 'string',
            name: 'title',
          },
          {
            type: 'string',
            name: 'description',
          }
        ]
      }
    ]
  });


export default ThreeCarousel;




// function FormItem(props) {
//   console.log('propsss: ', props)
//   return (
//     <div className={styles.formItemWrapper}>
//       hello one two three
//     </div>
//   );
// }