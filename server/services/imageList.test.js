import { fetchImageList } from './imageList.service'

describe('imageList.service', () => {
  it('should be defined', () => {
    expect(fetchImageList).toBeDefined()
  })

  it('should be able to retrieve a list of the latest images', async () => {
    const images = await fetchImageList()
    expect(images.length).toBeGreaterThan(1)
    expect(images[0]).toHaveProperty('id')
  })

  it('should be able to set size of image list to retrieve', async () => {
    const images = await fetchImageList({ perPage: 5 })
    expect(images.length).toBe(5)
  })

  it('should be able to retrieve different pages', async () => {
    const imagesFirstPage = await fetchImageList({ page: 1 })
    const imagesSecondPage = await fetchImageList({ page: 2 })
    expect(imagesFirstPage[0].id).not.toEqual(imagesSecondPage[0].id)
  })

  it('shoulb be able to set sort order', async () => {
    const imagesLatest = await fetchImageList({ orderBy: 'latest' })
    const imagesOldest = await fetchImageList({ orderBy: 'oldest' })
    const dateNew = new Date(imagesLatest[0].created_at)
    const dateOld = new Date(imagesOldest[0].created_at)
    expect(dateNew > dateOld).toBe(true)
  })
})
