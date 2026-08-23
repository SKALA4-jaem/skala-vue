import umbrellaImage from '@/assets/items/umbrella.png'
import bootsImage from '@/assets/items/boots.png'
import sunglassesImage from '@/assets/items/sunglasses.png'
import scarfImage from '@/assets/items/scarf.png'
import winterHatImage from '@/assets/items/winter-hat.png'
import fanImage from '@/assets/items/fan.png'
import warmCupImage from '@/assets/items/warm-cup.png'

export const dogItemAssets = {
  umbrella: { src: umbrellaImage, top: '-8px', left: '102px', width: '128px', zIndex: 6 },
  boots: {
    src: bootsImage,
    width: '82px',
    zIndex: 5,
    positions: {
      walk: { top: '154px', left: '70px' },
      sitFront: { top: '174px', left: '86px' },
      sitSide: { top: '174px', left: '70px' },
      lie: { top: '178px', left: '66px' },
    },
  },
  sunglasses: { src: sunglassesImage, top: '66px', left: '148px', width: '58px', zIndex: 5 },
  scarf: {
    src: scarfImage,
    width: '58px',
    zIndex: 5,
    positions: {
      walk: { top: '82px', left: '132px' },
      sitFront: { top: '96px', left: '102px' },
      sitSide: { top: '92px', left: '87px' },
      lie: { top: '118px', left: '80px' },
    },
  },
  winterHat: {
    src: winterHatImage,
    width: '78px',
    zIndex: 6,
    positions: {
      walk: { top: '24px', left: '128px' },
      sitFront: { top: '26px', left: '89px' },
      sitSide: { top: '30px', left: '66px' },
      lie: { top: '72px', left: '62px' },
    },
  },
  fan: { src: fanImage, top: '93px', left: '204px', width: '55px', zIndex: 5 },
  warmCup: { src: warmCupImage, top: '151px', left: '194px', width: '68px', zIndex: 5 },
}

export const resolveDogWeatherState = ({ weatherCode, temperature, isDay }) => {
  if (weatherCode >= 200 && weatherCode < 300) {
    return { items: [], effect: 'lightning' }
  }

  if (weatherCode >= 500 && weatherCode < 600) {
    return { items: ['umbrella', 'boots'], effect: 'rain' }
  }

  if ((weatherCode >= 600 && weatherCode < 700) || temperature <= 5) {
    return { items: ['winterHat', 'scarf', 'warmCup'], effect: 'snow' }
  }

  if (temperature >= 32) {
    return { items: ['sunglasses', 'fan'], effect: 'sun' }
  }

  if (weatherCode >= 801 && weatherCode <= 804) {
    return { items: [], effect: isDay ? 'clouds' : 'stars' }
  }

  return { items: [], effect: isDay ? 'sun' : 'stars' }
}
