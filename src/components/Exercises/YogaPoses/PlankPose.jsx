import { createRef, useEffect } from 'react'
import { Holistic } from '@mediapipe/holistic/holistic'
import {
  drawConnectors,
  drawLandmarks,
  lerp,
} from '@mediapipe/drawing_utils/drawing_utils'
import { POSE_CONNECTIONS, POSE_LANDMARKS } from '@mediapipe/pose/pose'
import '../../../css/ExerciseStyle.css'
import plankGIF from '../../../media/plankGIF.gif'
import calorieIcn from '../../../media/calories.png'
import clockIcn from '../../../media/clock.png'
import coinIcn from '../../../media/coin (1).png'


import { Camera } from '@mediapipe/camera_utils/camera_utils'

function PlankPose() {
  const canvasElementRef = createRef()
  const videoElementRef = createRef()
  const detectionConfidence = 0.7;
  const trackingConfidence = 0.3;

  useEffect(() => {
    const holistic = new Holistic({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`
      },
    })
    holistic.setOptions({
      upperBodyOnly: true,
      smoothLandmarks: false,
      minDetectionConfidence: detectionConfidence,
      minTrackingConfidence: trackingConfidence,
    })

    const camera = new Camera(videoElementRef.current, {
      onFrame: async () => {
        await holistic.send({ image: videoElementRef.current })
      },
      width: 640,
      height: 420,
    })
    holistic.onResults(onResults)
    camera.start()
  }, [])

  function removeElements(landmarks, elements) {
    for (const element of elements) {
      delete landmarks[element]
    }
  }

  function onResults(results) {
    const canvasCtx = canvasElementRef.current.getContext('2d')
    const canvasElement = canvasElementRef.current

    removeLandmarks(results)

    canvasCtx.save()
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height)
    canvasCtx.drawImage(
      results.image,
      0,
      0,
      canvasElement.width,
      canvasElement.height
    )

   
    canvasCtx.lineWidth = 1
    if (results.poseLandmarks) {
      if (results.rightHandLandmarks) {
        canvasCtx.strokeStyle = '#00FF00'
        connect(canvasCtx, [
          [
            results.poseLandmarks[POSE_LANDMARKS.RIGHT_ELBOW],
            results.rightHandLandmarks[0],
          ],
        ])
      }
      if (results.leftHandLandmarks) {
        canvasCtx.strokeStyle = '#FF0000'
        connect(canvasCtx, [
          [
            results.poseLandmarks[POSE_LANDMARKS.LEFT_ELBOW],
            results.leftHandLandmarks[0],
          ],
        ])
      }
    }

    // console.log(results.poseLandmarks[12].x)

        

 
  
  
    drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, {
      color: '#00FF00',
      lineWidth: 0.6
    })
    drawLandmarks(canvasCtx, results.poseLandmarks, {
      color: '#00FF00',
      fillColor: '#8fa9ff',
      lineWidth: 0.6
    })

    canvasCtx.restore()
  }

  // removing unwanted landmarks
  function removeLandmarks(results) {
    if (results.poseLandmarks) {
      removeElements(results.poseLandmarks, [
        0,1,2,3,4,5,6,7,8,9,10,29,30,31,32,22,18,20,21,19,17
      ])
    }
  }

  

  function connect(ctx, connectors) {
    const canvas = ctx.canvas
    for (const connector of connectors) {
      const from = connector[0]
      const to = connector[1]
      if (from && to) {
        if (
          from.visibility &&
          to.visibility &&
          (from.visibility < 0.1 || to.visibility < 0.1)
        ) {
          continue
        }
        ctx.beginPath()
        ctx.moveTo(from.x * canvas.width, from.y * canvas.height)
        ctx.lineTo(to.x * canvas.width, to.y * canvas.height)
        ctx.stroke()
      }
    }
  }


  

  return (
    <div className="ex-container">
      <h1>Plank Pose</h1>
      <div className="top-ex-container">
      <video
          style={{
            position: 'relative',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            display:"none"
          }}
          ref={videoElementRef}
        ></video>
        <canvas
          ref={canvasElementRef}
          style={{
            width: '640px',
            height: '55vh',
          }}
        ></canvas>

        <div className="ex-tut-container">
        <div className="correct-text">
          <h2>Lower Your Hip</h2>
        </div>

        <div className="gif-container">
          <img className='gif' src={plankGIF} alt="" />
        </div>
        </div>
      </div>
      <div className="bottom-ex-container">
          <div className="start-pause-cont">
            <button className='start-ex-btn'>START</button>
          </div>

          <div className="timer-container">
            <div className="current-time">
              <img className='clock-icn' src={clockIcn} alt="" />
              <h2>2.45s</h2>
            </div>
            <h2>Total Time : 60s</h2>
          </div>

          <div className="exe-info">
            <div className="info">
              <div className="info-img-cont">
                <img className='ex-info-icn' src={calorieIcn} alt="" />
                <div className="info-txt">
                  <h3>765</h3>
                </div>
              </div>

              <div className="info-img-cont">
                <img className='ex-info-icn' id='coin' src={coinIcn} alt="" />
                <div className="info-txt">
                  <h3>10</h3>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  )
}

export default PlankPose
