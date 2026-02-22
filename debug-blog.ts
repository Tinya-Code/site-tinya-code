import { getCollection } from 'astro:content';
const posts = await getCollection('blog');
console.log('Posts count:', posts.length);
posts.forEach(p => console.log('- ', p.id));
