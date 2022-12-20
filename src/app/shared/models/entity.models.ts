export interface Blog {
  title: string,
  content: string,
  image: string | null,
  created_at: string,
}


export interface Category {
  name: string,
  enabled: boolean | number,
  is_subcategory: boolean | number,
  weight: null | string ,
}


export interface Picture {
  title: string,
  description: string,
  category: string,
  image: string,
  created_at: string,
}
