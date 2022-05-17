import './App.css';
import { registerVevComponent } from '@vev/react';
import { useEffect } from 'react';
import styles from './PhotoThreeSixty.scss'
import ThreeSixty from 'react-360-view'


function PhotoThreeSixy() {


  return (
    <div className={styles.container}>
        <ThreeSixty
            amount={36}
            imagePath="https://scaleflex.cloudimg.io/width/600/q35/https://scaleflex.ultrafast.io/https://scaleflex.airstore.io/demo/chair-360-36"
            fileName="chair_{index}.jpg?v1"
        />
    </div>
  );
}



registerVevComponent(PhotoThreeSixy, {
    name: "Photo 360",
    props: [
        {
            type: 'image',
            name: 'img',
        }
    ]
  });


export default PhotoThreeSixy;