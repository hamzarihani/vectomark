'use client';

import { useProfileStore } from '@/store/useProfileStore';
import { generateMarkdown } from '@/lib/generator/markdownCompiler';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function PreviewPanel() {
  const config = useProfileStore((state) => state.config);
  const [markdown, setMarkdown] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      setMarkdown(generateMarkdown(config));
    }
  }, [config, mounted]);

  if (!mounted) return <div className="p-8 flex h-full items-center justify-center">Loading Preview...</div>;

  return (
    <div className="h-full flex flex-col w-full">
      <Tabs defaultValue="preview" className="flex flex-col h-full">
        <div className="flex items-center justify-between px-4 pt-3 pb-2 border-b border-white/10 bg-white/5 shrink-0">
          <TabsList>
            <TabsTrigger value="preview">Live Preview</TabsTrigger>
            <TabsTrigger value="code">Code View</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="preview" className="flex-1 overflow-hidden m-0 data-[state=active]:flex data-[state=active]:flex-col">
          <ScrollArea className="h-full w-full">
            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="p-8 max-w-4xl mx-auto markdown-preview"
            >
              <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                {markdown}
              </ReactMarkdown>
            </motion.div>
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="code" className="flex-1 overflow-hidden m-0 data-[state=active]:flex data-[state=active]:flex-col bg-[#1e1e1e]">
          <ScrollArea className="h-full w-full">
            <SyntaxHighlighter
              language="markdown"
              style={vscDarkPlus}
              customStyle={{ margin: 0, padding: '2rem', minHeight: '100%', background: 'transparent' }}
              wrapLongLines
            >
              {markdown}
            </SyntaxHighlighter>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}
