import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServerConfigConstants } from '../constants/constants';
import { BasicResponse } from '../models/authentication.models';
import { Blog, Category, Picture } from '../models/entity.models';
import { BaseHttpService } from './base-http.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService extends BaseHttpService {
  getCategories() {
    return this.get<BasicResponse<Category[]>>(ServerConfigConstants.BACKEND_ADDRESS + '/category');
  }

  getCategory(categoryName: string) {
    return this.get<BasicResponse<Category>>(ServerConfigConstants.BACKEND_ADDRESS + '/category', {name: categoryName});
  }

  saveCategory(category: Category) {
    return this.post<BasicResponse<Category>>(ServerConfigConstants.BACKEND_ADDRESS + '/category', category);
  }

  updateCategory(category: Category) {
    return this.put<BasicResponse<Category>>(ServerConfigConstants.BACKEND_ADDRESS + '/category', category);
  }

  deleteCategory(categoryName: string) {
    return this.delete(ServerConfigConstants.BACKEND_ADDRESS + '/category', {name: categoryName});
  }

  getPicture(pictureTitle: string) {
    return this.get<BasicResponse<Picture>>(ServerConfigConstants.BACKEND_ADDRESS + '/picture', {title: pictureTitle});
  }

  getPictures() {
    return this.get<BasicResponse<Picture[]>>(ServerConfigConstants.BACKEND_ADDRESS + '/picture');
  }

  savePicture(picture: Picture) {
    return this.post<BasicResponse<Picture>>(ServerConfigConstants.BACKEND_ADDRESS + '/picture', picture);
  }

  deletePicture(pictureTitle: string) {
    return this.delete<BasicResponse<Picture>>(ServerConfigConstants.BACKEND_ADDRESS + '/picture', {title: pictureTitle})
  }

  getBlogs() {
    return this.get<BasicResponse<Blog[]>>(ServerConfigConstants.BACKEND_ADDRESS + '/blog');
  }

  getBlog(blogTitle: string) {
    return this.get<BasicResponse<Blog>>(ServerConfigConstants.BACKEND_ADDRESS + '/blog', {title: blogTitle}); // TODO
  }

  saveBlog(blog: Blog) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json'); // todo should i remove due to interceptor
    headers.append('withCredentials', 'true');
    return this.post<BasicResponse<Blog>>(ServerConfigConstants.BACKEND_ADDRESS + '/blog', blog);
  }

  updateBlog(blog: Blog) {
    return this.put<BasicResponse<Blog>>(ServerConfigConstants.BACKEND_ADDRESS + '/blog', blog);

  }

}
