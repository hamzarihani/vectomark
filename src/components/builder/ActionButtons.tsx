'use client';

import { useProfileStore } from '@/store/useProfileStore';
import { generateMarkdown } from '@/lib/generator/markdownCompiler';
import { Button } from '@/components/ui/button';
import { Copy, Download } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { toast } from 'sonner';

export default function ActionButtons() {
  const config = useProfileStore((state) => state.config);

  const handleCopy = () => {
    const markdown = generateMarkdown(config);
    navigator.clipboard.writeText(markdown);
    toast.success('Copied to clipboard!', {
      description: 'Support Vectomark by leaving a star on GitHub! ⭐',
      action: {
        label: 'Star on GitHub',
        onClick: () => window.open('https://github.com/hamzarihani/vectomark', '_blank')
      }
    });
  };

  const handleDownload = () => {
    const markdown = generateMarkdown(config);
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Downloaded README.md', {
      description: 'Support Vectomark by leaving a star on GitHub! ⭐',
      action: {
        label: 'Star on GitHub',
        onClick: () => window.open('https://github.com/hamzarihani/vectomark', '_blank')
      }
    });
  };

  const handleExportAction = () => {
    const actionYaml = `name: Update README
on:
  schedule:
    - cron: '0 0 * * *'
  workflow_dispatch:
jobs:
  update-readme:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      # Add steps here to auto-update stats if you are generating SVGs locally.
      # Since Vectomark uses dynamic APIs, this action is optional 
      # but useful for periodic hard-commits of dynamic assets.
`;
    const blob = new Blob([actionYaml], { type: 'text/yaml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'update-readme.yml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Exported GitHub Action workflow');
  };

  return (
    <div className="flex flex-wrap gap-2 justify-end w-full">
      <Button onClick={handleCopy} variant="outline" size="sm">
        <Copy className="w-4 h-4 mr-2" />
        Copy Markdown
      </Button>
      <Button onClick={handleDownload} variant="default" size="sm">
        <Download className="w-4 h-4 mr-2" />
        Download README
      </Button>
      <Button onClick={handleExportAction} variant="secondary" size="sm">
        <FaGithub className="w-4 h-4 mr-2" />
        Export Action
      </Button>
    </div>
  );
}
