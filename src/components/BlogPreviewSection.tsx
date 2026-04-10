import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBlogPosts } from "@/hooks/useErpData";

const BlogPreviewSection = () => {
  const { data: posts = [] } = useBlogPosts();
  const featured = posts.slice(0, 3);

  return (
    <section className="section-padding">
      <div className="container">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">Our Blog</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">Dubai Driving Tips & Guides</h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">Expert advice on car rentals, driving in Dubai, and making the most of your trip.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {featured.map((post) => (
            <Link key={post.id} to={`/blog/${post.slug || post.id}`} className="group block">
              <article className="bg-background rounded-2xl overflow-hidden border border-border hover:border-primary/20 hover:shadow-xl transition-all duration-300 hover-lift h-full flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    width={400}
                    height={200}
                  />
                  <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-full tracking-wide uppercase">
                    {post.tags?.[0] || "Blog"}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                    <span>{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2 font-sans group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1 line-clamp-3">{post.excerpt}</p>
                </div>
              </article>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/blog">
            <Button variant="outline" size="lg" className="gap-2 rounded-xl border-primary/30 hover:bg-primary hover:text-primary-foreground">
              View All Articles <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreviewSection;
