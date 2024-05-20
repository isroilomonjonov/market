export const ProductsService = {
  async getAllProducts() {
    const res = await fetch(`http://localhost:9090/api/v1/products`, {
      cache: "no-cache",
    });
    const data = await res.json();
    return data.data.allProduct.content;
  },
  //   async getAllCourseById(id: string) {
  //     const res = await fetch(`${serviceURL}/courses/${id}`, {
  //       cache: "no-cache",
  //     });
  //     const data = await res.json();
  //     return data?.data?.byId;
  //   },
};
