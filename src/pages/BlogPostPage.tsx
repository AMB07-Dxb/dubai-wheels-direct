import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Skeleton } from "@/components/ui/skeleton";
import { useBlogPost, useBlogPosts } from "@/hooks/useErpData";

const BlogPostPage = () => {
  const { id } = useParams();
  const { data: post, isLoading } = useBlogPost(id || "");
  const { data: allPosts = [] } = useBlogPosts();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container pt-32 max-w-3xl space-y-6">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-80 w-full rounded-2xl" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container pt-32 pb-20 text-center">
          <h1 className="text-3xl font-display font-bold text-foreground mb-4">Post Not Found</h1>
          <Link to="/blog"><Button variant="outline" className="gap-2 rounded-xl"><ArrowLeft className="w-4 h-4" /> Back to Blog</Button></Link>
        </div>
        <Footer />
      </div>
    );
  }

  const related = allPosts.filter((p) => p.id !== post.id).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.date,
    author: { "@type": "Organization", name: "Al Emad Rent A Car" },
    publisher: { "@type": "Organization", name: "Al Emad Rent A Car" },
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${post.metaTitle || post.title} | Al Emad Rent A Car Blog`}
        description={post.metaDescription || post.excerpt}
        canonical={`https://dubai-wheels-direct.lovable.app/blog/${post.slug || post.id}`}
        type="article"
        image={post.image}
        jsonLd={jsonLd}
      />
      <Navbar />

      <article className="pt-24 pb-20">
        <div className="container max-w-3xl">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>

          <div className="mb-8">
            <span className="inline-block bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-full tracking-wide uppercase mb-4">
              {post.tags?.[0] || "Blog"}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4 leading-tight">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span>{post.author}</span>
              <span>•</span>
              <span>{new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden mb-10">
            <img src={post.image} alt={post.title} className="w-full h-64 sm:h-80 md:h-96 object-cover" loading="lazy" width={800} height={400} />
          </div>

          <div
            className="prose prose-lg max-w-none text-foreground
              prose-headings:font-display prose-headings:text-foreground
              prose-p:text-muted-foreground prose-p:leading-relaxed
              prose-li:text-muted-foreground
              prose-strong:text-foreground
              prose-a:text-primary hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-border">
            <Tag className="w-4 h-4 text-muted-foreground mt-0.5" />
            {post.tags?.map((tag) => (
              <span key={tag} className="text-xs bg-muted text-muted-foreground px-3 py-1.5 rounded-full">{tag}</span>
            ))}
          </div>
        </div>

        {related.length > 0 && (
          <div className="container max-w-5xl mt-20">
            <h2 className="text-2xl font-display font-bold text-foreground mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link key={r.id} to={`/blog/${r.slug || r.id}`} className="group block">
                  <div className="bg-background rounded-2xl overflow-hidden border border-border hover:border-primary/20 transition-all duration-300 hover-lift">
                    <img src={r.image} alt={r.title} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" width={400} height={160} />
                    <div className="p-5">
                      <p className="text-xs text-muted-foreground mb-2">{new Date(r.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</p>
                      <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 font-sans">{r.title}</h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>

      <Footer />
    </div>
  );
};

export default BlogPostPage;
