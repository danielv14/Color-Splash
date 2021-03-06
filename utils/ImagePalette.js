import chroma from 'chroma-js'
import * as Vibrant from 'node-vibrant'

import Image from './Image'

/**
 * ImagePalette class
 */
class ImagePalette extends Image {
  /**
   * Get the dominant colors from image thumbnail
   * @returns {Array} Array of dominant colors
   */
  async getDominantColors() {
    const colors = await this.getHexValuesFromImage(this.getImageThumb())
    return colors
  }

  /**
   * Get array of hex colors with dominant colors from provided image url
   * @param {String} url url of image to get dominant hex color values from
   * @returns {Promise[]} Promise of hex value array
   */
  async getHexValuesFromImage(url) {
    if (!url) {
      return []
    }
    const vibrantPalette = await this._getPalette()
    const colors = Object.keys(vibrantPalette).map(swatch =>
      vibrantPalette[swatch].getHex()
    )
    return colors
  }

  /**
   * Get array of dominant colors as Chroma instances
   * @returns {Chroma[]} Array of Chroma color instances
   */
  async getChromaColors() {
    const vibrantPalette = await this._getPalette()
    const colors = Object.keys(vibrantPalette).map(swatch =>
      chroma(vibrantPalette[swatch].getHex())
    )
    return colors
  }

  /**
   * Get a palette from image via Promise
   * Uses thumbnail size of image to speed up performance
   * @returns {Promise} Promise of Vibrant palette
   */
  _getPalette() {
    return Vibrant.from(this.getImageThumb()).getPalette()
  }
}

export default ImagePalette
