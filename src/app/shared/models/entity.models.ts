export interface Blog {
  title: string,
  content: string,
  image_format: string,
  image: string,
  created_at: string,
}


export interface Category {
  name: string,
  enabled: boolean | number,
  is_subcategory: boolean | number,
  weight: number | null,
}


export interface Picture {
  title: string,
  description: string,
  category: string,
  image_format: string,
  image: string,
  created_at: string,
}
