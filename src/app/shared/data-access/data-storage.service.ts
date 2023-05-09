import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServerConfigConstants } from '../constants/constants';
import { BasicResponse } from '../models/authentication.models';
import { Blog, Category, Picture } from '../models/entity.models';
import { BaseHttpService } from './base-http.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService extends BaseHttpService {
  getCategories(enabledOnly?: boolean) {
    let params = new HttpParams;
    if (enabledOnly) {
      params = params.set('enabled_only', enabledOnly);
    }
    return this.get<BasicResponse<Category[]>>(ServerConfigConstants.BACKEND_ADDRESS + '/category', params);
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
    return this.delete<BasicResponse<Category>>(ServerConfigConstants.BACKEND_ADDRESS + '/category', {name: categoryName});
  }

  getPicture(pictureTitle: string) {
    return this.get<BasicResponse<Picture>>(ServerConfigConstants.BACKEND_ADDRESS + '/picture', {title: pictureTitle});
  }

  getPictures(categories?: string[], years?: string[], limit?: number, cursorPictureTitle?: string) {
    let params = new HttpParams();
    categories?.forEach((category) => {
      params = params.append('category', category);
    })

    years?.forEach((year) => {
      params = params.append('year', year);
    })

    if (limit) {
      params = params.set('limit', limit);
    }

    if (cursorPictureTitle) {
      params = params.set('cursor_picture_title', cursorPictureTitle);
    }

    return this.get<BasicResponse<Picture[]>>(ServerConfigConstants.BACKEND_ADDRESS + '/picture', params);
  }

  getDistinctPictureYears() {
    return this.get<BasicResponse<string[]>>(ServerConfigConstants.BACKEND_ADDRESS + '/picture/years');
  }

  getPicturesForHome() {
    return this.get<BasicResponse<Picture[]>>(ServerConfigConstants.BACKEND_ADDRESS + '/home/pictures');
  }

  savePicture(picture: Picture) {
    return this.post<BasicResponse<Picture>>(ServerConfigConstants.BACKEND_ADDRESS + '/picture', picture);
  }

  updatePicture(picture: Picture) {
    return this.put<BasicResponse<Picture>>(ServerConfigConstants.BACKEND_ADDRESS + '/picture', picture);
  }

  updateFavouritePictures(pictures: Picture[]) {
    return this.put<BasicResponse<Picture[]>>(ServerConfigConstants.BACKEND_ADDRESS + '/home/pictures', pictures);
  }

  deletePicture(pictureTitle: string) {
    return this.delete<BasicResponse<Picture>>(ServerConfigConstants.BACKEND_ADDRESS + '/picture', {title: pictureTitle});
  }

  getBlogs() {
    return this.get<BasicResponse<Blog[]>>(ServerConfigConstants.BACKEND_ADDRESS + '/blog');
  }

  getBlog(blogTitle: string) {
    return this.get<BasicResponse<Blog>>(ServerConfigConstants.BACKEND_ADDRESS + '/blog', {title: blogTitle});
  }

  saveBlog(blog: Blog) {
    return this.post<BasicResponse<Blog>>(ServerConfigConstants.BACKEND_ADDRESS + '/blog', blog);
  }

  updateBlog(blog: Blog) {
    return this.put<BasicResponse<Blog>>(ServerConfigConstants.BACKEND_ADDRESS + '/blog', blog);
  }

  deleteBlog(blogTitle: string) {
    return this.delete<BasicResponse<Picture>>(ServerConfigConstants.BACKEND_ADDRESS + '/blog', {title: blogTitle});
  }
}
