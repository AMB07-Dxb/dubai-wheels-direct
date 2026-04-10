import { Link } from "react-router-dom";
import { Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { useBlogPosts } from "@/hooks/useErpData";
import { Skeleton } from "@/components/ui/skeleton";

const BlogPage = () => {
  const { data: posts = [], isLoading } = useBlogPosts();

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Car Rental Blog Dubai | Tips & Guides | Al Emad Rent A Car"
        description="Expert tips on renting cars in Dubai, driving guides, road trip routes, document requirements, and money-saving advice from Al Emad Rent A Car."
        canonical="https://dubai-wheels-direct.lovable.app/blog"
      />
      <Navbar />

      <section className="pt-28 pb-14">
        <div className="container">
          <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">Blog</p>
          <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-3">Dubai Driving Tips & Guides</h1>
          <p className="text-muted-foreground max-w-lg">Expert advice on car rentals, driving rules, road trips, and making the most of your time in Dubai.</p>
        </div>
      </section>

      <section className="pb-24 px-4 md:px-8">
        <div className="container">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-2xl border border-border overflow-hidden">
                  <Skeleton className="h-48 w-full" />
                  <div className="p-5 space-y-3">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link key={post.id} to={`/blog/${post.slug || post.id}`} className="group block">
                  <article className="bg-background rounded-2xl overflow-hidden border border-border hover:border-primary/20 hover:shadow-xl transition-all duration-300 hover-lift h-full flex flex-col">
                    <div className="relative h-48 sm:h-52 overflow-hidden">
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
                    <div className="p-5 sm:p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                        <span>{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                      </div>
                      <h2 className="text-lg font-bold text-foreground mb-2 font-sans group-hover:text-primary transition-colors line-clamp-2">{post.title}</h2>
                      <p className="text-sm text-muted-foreground leading-relaxed flex-1 line-clamp-3">{post.excerpt}</p>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {post.tags?.slice(0, 2).map((tag) => (
                          <span key={tag} className="text-[10px] bg-muted text-muted-foreground px-2 py-1 rounded-full">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPage;
