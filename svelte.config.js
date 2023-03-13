// import adapter from '@sveltejs/adapter-static';
import adapter from '@sveltejs/adapter-vercel';
 
export default {
  kit: {
    adapter: adapter({
      fallback: '200.html'
    })
  }
};
