import React, { useState, useEffect } from 'react';

const TOPICS = ['All', 'WebDev', 'Mobile', 'Cyber', 'DataAI', 'DevOps', 'Jobs', 'General'];

const INITIAL_POSTS = [
  {
    id: 1,
    author: 'Armand Kengne',
    handle: '@armand_web',
    city: 'Yaoundé',
    topic: 'WebDev',
    content: 'Just launched my first React app hosted on Vercel! If anyone in Yaoundé wants to pair-program on API integration using Supabase, let me know in the comments.',
    timestamp: '2 hours ago',
    likes: 14,
    comments: [
      { id: 101, author: 'Sandra N.', text: 'Great work Armand! Would love to see how you structured your Supabase client.' }
    ]
  },
  {
    id: 2,
    author: 'Grace Fouda',
    handle: '@grace_sec',
    city: 'Buea',
    topic: 'Cyber',
    content: 'TryHackMe has released new free rooms on Wireshark network packet analysis. Super useful for anyone preparing for entry-level security analyst roles!',
    timestamp: '4 hours ago',
    likes: 22,
    comments: []
  },
  {
    id: 3,
    author: 'Patrick Mbah',
    handle: '@patrick_cloud',
    city: 'Douala',
    topic: 'Jobs',
    content: 'Orange Digital Center Douala is accepting applications for their upcoming free Cloud & DevOps bootcamp. Make sure to check the Directory tab for details.',
    timestamp: '6 hours ago',
    likes: 31,
    comments: [
      { id: 102, author: 'Junior T.', text: 'Thanks for sharing! Just submitted my application.' }
    ]
  }
];

const CommunityForum = ({ currentUser }) => {
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem('forum_posts');
    return saved ? JSON.parse(saved) : INITIAL_POSTS;
  });

  const [selectedTopic, setSelectedTopic] = useState('All');
  const [newPostText, setNewPostText] = useState('');
  const [postTopic, setPostTopic] = useState('General');
  const [activeCommentPostId, setActiveCommentPostId] = useState(null);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    localStorage.setItem('forum_posts', JSON.stringify(posts));
  }, [posts]);

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    const userName = currentUser?.user_metadata?.full_name || currentUser?.email?.split('@')[0] || 'Cameroon Student';
    const userCity = currentUser?.user_metadata?.region || 'Cameroon';

    const newPost = {
      id: Date.now(),
      author: userName,
      handle: `@${userName.toLowerCase().replace(/\s+/g, '_')}`,
      city: userCity,
      topic: postTopic,
      content: newPostText.trim(),
      timestamp: 'Just now',
      likes: 0,
      comments: []
    };

    setPosts([newPost, ...posts]);
    setNewPostText('');
  };

  const handleLike = (postId) => {
    setPosts(posts.map(p => {
      if (p.id === postId) {
        const isLiked = p.userLiked;
        return { ...p, likes: isLiked ? p.likes - 1 : p.likes + 1, userLiked: !isLiked };
      }
      return p;
    }));
  };

  const handleAddComment = (postId) => {
    if (!commentText.trim()) return;

    const userName = currentUser?.user_metadata?.full_name || 'Student';

    setPosts(posts.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          comments: [...p.comments, { id: Date.now(), author: userName, text: commentText.trim() }]
        };
      }
      return p;
    }));

    setCommentText('');
  };

  const filteredPosts = posts.filter(p => selectedTopic === 'All' || p.topic === selectedTopic);

  return (
    <div>
      <div className="page-header">
        <h1>Community Discussion Forum</h1>
        <p>Connect, share technical progress, ask questions, and collaborate with IT students across Cameroon.</p>
      </div>

      {/* Post Composer */}
      <div className="card" style={{ marginBottom: '1.5rem', borderLeft: '3px solid var(--primary)' }}>
        <form onSubmit={handleCreatePost}>
          <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.75rem', color: 'var(--primary)' }}>
            Post an Idea, Question, or Tech Update
          </div>
          <textarea
            value={newPostText}
            onChange={(e) => setNewPostText(e.target.value)}
            placeholder="What tech project or topic are you working on today?"
            rows={3}
            style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontSize: '0.9rem', outline: 'none', background: 'var(--card-bg)', resize: 'vertical', fontFamily: 'inherit' }}
            required
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Topic Tag:</label>
              <select
                value={postTopic}
                onChange={(e) => setPostTopic(e.target.value)}
                style={{ padding: '0.35rem 0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontSize: '0.82rem', background: 'white' }}
              >
                {TOPICS.filter(t => t !== 'All').map(t => <option key={t} value={t}>#{t}</option>)}
              </select>
            </div>
            <button type="submit" className="btn btn-primary btn-sm">Post to Forum</button>
          </div>
        </form>
      </div>

      {/* Topic Filter Pills */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        {TOPICS.map(topic => (
          <button
            key={topic}
            onClick={() => setSelectedTopic(topic)}
            className={`btn btn-sm ${selectedTopic === topic ? 'btn-primary' : 'btn-ghost'}`}
            style={{ borderRadius: 'var(--radius-sm)' }}
          >
            {topic === 'All' ? 'All Discussions' : `#${topic}`}
          </button>
        ))}
      </div>

      {/* Feed List */}
      <div className="flex-col">
        {filteredPosts.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
            No posts found under #{selectedTopic}. Be the first to start a conversation!
          </div>
        ) : filteredPosts.map(post => (
          <div key={post.id} className="card" style={{ marginBottom: '1rem' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.65rem' }}>
              <div>
                <span style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '0.95rem' }}>{post.author}</span>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginLeft: '0.5rem' }}>{post.handle}</span>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginLeft: '0.5rem' }}>&middot; {post.city}</span>
              </div>
              <span className="badge badge-muted">#{post.topic}</span>
            </div>

            {/* Content */}
            <p style={{ fontSize: '0.92rem', color: 'var(--text-primary)', lineHeight: 1.6, marginBottom: '0.85rem' }}>
              {post.content}
            </p>

            {/* Action Bar */}
            <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '0.65rem', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              <button
                onClick={() => handleLike(post.id)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600, color: post.userLiked ? 'var(--primary)' : 'var(--text-secondary)' }}
              >
                {post.userLiked ? '[Liked]' : '[Like]'} ({post.likes})
              </button>
              <button
                onClick={() => setActiveCommentPostId(activeCommentPostId === post.id ? null : post.id)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600, color: 'var(--text-secondary)' }}
              >
                Comments ({post.comments ? post.comments.length : 0})
              </button>
              <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: 'var(--text-muted)' }}>{post.timestamp}</span>
            </div>

            {/* Comments Drawer */}
            {activeCommentPostId === post.id && (
              <div style={{ marginTop: '0.85rem', paddingTop: '0.85rem', borderTop: '1px dashed var(--border)' }}>
                {post.comments && post.comments.map(c => (
                  <div key={c.id} style={{ background: 'var(--card-bg-subtle)', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)', marginBottom: '0.4rem', fontSize: '0.85rem' }}>
                    <strong style={{ color: 'var(--primary)' }}>{c.author}: </strong>
                    <span>{c.text}</span>
                  </div>
                ))}
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <input
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Write a reply..."
                    style={{ flex: 1, padding: '0.4rem 0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontSize: '0.82rem', outline: 'none' }}
                  />
                  <button onClick={() => handleAddComment(post.id)} className="btn btn-primary btn-sm">Reply</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityForum;
