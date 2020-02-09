import { Component } from "@angular/core";
import { ServiceService } from "./services/service.service";
import { Post } from "./models/post";
import { Author } from "./models/author";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  posts: Post[] = []; //Array to save the publications
  authors: Author[] = []; //Array to save the authors
  visible: boolean = false; //Variable used to display the comments initialized as false
  sort: String = "desc"; //The default sort is initialized as descending
  author: String = ""; //Author is initialized empty
  page: number = 1; //Page used to paginate is initialized in one
  comments: Comment[] = []; //Array to save the comments
  constructor(private services: ServiceService) {}
  ngOnInit(): void {
    // OnInit the data of publications and authors are add
    this.loadData(this.page, "");
    this.loadAuthors();
  }

  // Function to load publications
  loadData(index, author): void {
    this.page = index; //The index is saved as the new page
    this.author = author; //The authos is saved
    this.services.getPost(this.page, author, this.sort).subscribe(
      data => {
        this.posts = data;
      },
      err => {
        // In case the server response an error the publications become in a empty array
        this.posts = [];
      }
    );
  }
  // Function to load the Authors
  loadAuthors(): void {
    this.services.getAuthors().subscribe(
      data => {
        this.authors = data;
      },
      err => {
        // In case the server response an error the authors become in a empty array
        this.authors = [];
      }
    );
  }
  // Function to display the comments in a Drawer
  showComments(idPost) {
    // The boolean variable to show the comments become true
    this.visible = true;
    this.services.getComments(idPost).subscribe(
      data => {
        this.comments = data;
      },
      err => {
        // In case the server response an error the comments become in a empty array
        this.comments = [];
      }
    );
  }
  // Function to close the drawer
  close() {
    this.visible = false;
  }
  // Function to invert the sort asc or desc
  invertSort() {
    // Condition to invert the sort
    if (this.sort === "asc") {
      this.sort = "desc";
    } else {
      this.sort = "asc";
    }
    /* 
      The function to load the piblications is used to apply the new sort
      The page is restart in one to the server request
      The author selected is respected to the server request
    */
    this.loadData((this.page = 1), this.author);
  }
}
