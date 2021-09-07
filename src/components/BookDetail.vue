<template>
  <div v-if="currentBook" class="edit-form">
    <h4>Book</h4>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          v-model="currentBook.title"
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input
          type="text"
          class="form-control"
          id="description"
          v-model="currentBook.description"
        />
      </div>
    </form>

    <button class="badge badge-danger mr-2" @click="deleteBook">Delete</button>

    <button type="submit" class="badge badge-success" @click="updateBook">
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Book...</p>
  </div>
</template>

<script>
import BookService from "../services/BookService";

export default {
  name: "book",
  data() {
    return {
      currentBook: null,
      message: "",
    };
  },
  methods: {
    getBook(isbn) {
      BookService.get(isbn)
        .then((response) => {
          this.currentBook = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updatePublished(status) {
      var data = {
        isbn: this.currentBook.isbn,
        title: this.currentBook.title,
        description: this.currentBook.description,
        published: status,
      };
    
      BookService.update(this.currentBook.isbn, data)
        .then((response) => {
          this.currentBook.published = status;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updateBook() {
      BookService.update(this.currentBook.isbn, this.currentBook)
        .then((response) => {
          console.log(response.data);
          this.message = "The book was updated successfully!";
        })
        .catch((e) => {
          console.log(e);
        });
    },

    deleteBook() {
      BookService.delete(this.currentBook.isbn)
        .then((response) => {
          console.log(response.data);
          this.$router.push({ name: "book" });
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.message = "";
    this.getBook(this.$route.params.isbn);
  },
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>