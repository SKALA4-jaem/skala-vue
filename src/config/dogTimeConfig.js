import walkImage from '@/assets/dog/walk.png'
import front1Image from '@/assets/dog/front-1.png'
import front2Image from '@/assets/dog/front-2.png'
import front3Image from '@/assets/dog/front-3.png'
import side1Image from '@/assets/dog/side-1.png'
import side2Image from '@/assets/dog/side-2.png'
import side3Image from '@/assets/dog/side-3.png'
import side4Image from '@/assets/dog/side-4.png'
import lie1Image from '@/assets/dog/lie-1.png'
import lie2Image from '@/assets/dog/lie-2.png'
import lie3Image from '@/assets/dog/lie-3.png'
import lie4Image from '@/assets/dog/lie-4.png'

export const dogPoseAssets = {
  walk: { src: walkImage, sprite: true, frameCount: 4, frameDuration: 550 },
  sitFront: { frames: [front1Image, front2Image, front3Image], frameDuration: 750 },
  sitSide: { frames: [side1Image, side2Image, side3Image, side4Image], frameDuration: 750 },
  lie: { frames: [lie1Image, lie2Image, lie3Image, lie4Image], frameDuration: 900 },
}

export const resolveDogTimeState = (hour) => {
  if (hour < 6) return { pose: 'lie', message: '포근하게 누워 쉬는 시간이에요.' }
  if (hour < 9) return { pose: 'sitFront', message: '아침을 맞아 앞을 보고 앉아 있어요.' }
  if (hour < 17) return { pose: 'walk', message: '신나게 걸으며 날씨를 확인하고 있어요.' }
  if (hour < 21) return { pose: 'sitSide', message: '저녁 풍경을 바라보며 앉아 있어요.' }
  return { pose: 'lie', message: '하루를 마치고 편안하게 누워 있어요.' }
}
