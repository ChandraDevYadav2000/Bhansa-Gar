const { gql, default:request } = require("graphql-request")
const MASTER_URL=process.env.NEXT_PUBLIC_BACKEND_API_URL;

/**
 * 
 * @returns Get Categories List
 */
const GetCategory=async()=>{
    const query=gql`
    query Categories {
        categories(first: 50) {
          id
          name
          icon {
            url
          }
        }
      }      
    `
    const result=await request(MASTER_URL,query);
    return result;
}

const GetBusiness=async(category)=>{
  const query=`
  query GetBusiness {
    restaurants(where: {categories_some: {slug: "`+category+`"}}) {
      aboutUs
      address
      banner {
        url
      }
      categories {
        name
      }
      id
      name
      restroType
      slug
      workingHours
    }
  }
  
  `
  const result=await request(MASTER_URL,query);
    return result;
}

export default{
    GetCategory,
    GetBusiness
}