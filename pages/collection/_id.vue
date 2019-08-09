<template>
  <div>
    <v-layout align-center column>
      <v-breadcrumbs :items="breadcrumbs" divider=">" />
      <h2>{{ collection.title }}</h2>
      <span class="grey--text">
        {{ collection.total_photos }} images.
        <image-attribute-link :user="collection.user" />
      </span>
      <span v-if="collection.description" class="grey--text">
        {{ collection.description }}
      </span>
    </v-layout>
    <v-layout align-start row wrap>
      <layout-masonry-images :images="images" />
    </v-layout>
    <v-layout v-if="hasImages" align-center justify-center>
      <p v-if="hasLoadedAllImages" class="grey--text">
        Nothing more to see here
      </p>
      <image-fetch-button
        v-else
        :loading="loadingImages"
        :lazy="true"
        @fetch="loadMore"
      />
    </v-layout>
  </div>
</template>

<script>
export default {
  data() {
    return {
      collection: { user: {} },
      images: [],
      loadingImages: false,
      breadcrumbs: [
        {
          text: 'Collections',
          disabled: false,
          to: '/collections'
        }
      ]
    }
  },
  computed: {
    hasImages() {
      return this.images.length > 0
    },
    hasLoadedAllImages() {
      return this.collection.total_photos === this.images.length
    }
  },
  async mounted() {
    this.collection = this.$store.state.collection.currentCollection
    this.breadcrumbs.push({
      text: this.collection.title || 'Current collection',
      disabled: true
    })
    this.images = await this.getCollectionImages({
      id: this.collection.id
    })
  },
  methods: {
    async getCollectionImages({ id, page = 1, perPage, orderBy }) {
      const { data } = await this.$api.getCollectionImages({
        id,
        page,
        perPage,
        orderBy
      })
      return data
    },
    async loadMore({ page, perPage }) {
      this.loadingImages = true
      const newImages = await this.getCollectionImages({
        id: this.collection.id,
        page,
        perPage,
        orderBy: this.orderBy
      })
      this.images.push(...newImages)
      this.loadingImages = false
    }
  }
}
</script>