'use client';

import { useState } from 'react';
import { useProfileStore } from '@/store/useProfileStore';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { UserCircle, FileText, Code2, BarChart3, Sparkles, GitBranch, Loader2 } from 'lucide-react';
import { PREDEFINED_SKILLS, getSkillsByCategory } from '@/lib/skillsList';

export default function EditorPanel() {
  const { config, updateHeader, updateAbout, updateSkills, updateChartsAndStats, updateTheme, updateCustomSvgs } = useProfileStore();
  
  const [isFetchingGithub, setIsFetchingGithub] = useState(false);
  const [githubUsernameInput, setGithubUsernameInput] = useState(config.chartsAndStats.githubUsername || '');

  const fetchGithubProfile = async () => {
    if (!githubUsernameInput) return;
    setIsFetchingGithub(true);
    try {
      const res = await fetch(`https://api.github.com/users/${githubUsernameInput}`);
      if (res.status === 403 || res.status === 429) {
        alert('GitHub API rate limit reached. Please try again later or add a GITHUB_TOKEN locally.');
        return;
      }
      if (!res.ok) throw new Error('User not found');
      const data = await res.json();
      
      updateHeader({ 
        name: data.name || data.login, 
        avatarUrl: data.avatar_url,
      });
      updateAbout({ 
        bioMarkdown: data.bio || config.about.bioMarkdown,
        location: data.location || config.about.location,
      });
      updateChartsAndStats({ githubUsername: data.login });

      // Fetch top repos to guess languages
      const reposRes = await fetch(`https://api.github.com/users/${githubUsernameInput}/repos?sort=updated&per_page=100`);
      if (reposRes.ok) {
        const repos = await reposRes.json();
        const langs: Record<string, number> = {};
        repos.forEach((r: any) => {
          if (r.language) {
            langs[r.language] = (langs[r.language] || 0) + 1;
          }
        });
        
        // Map languages to skill icons
        const langMap: Record<string, string> = {
          'TypeScript': 'ts',
          'JavaScript': 'js',
          'Python': 'python',
          'HTML': 'html',
          'CSS': 'css',
          'Java': 'java',
          'C#': 'cs',
          'Go': 'go',
          'Rust': 'rust',
          'Ruby': 'ruby',
          'PHP': 'php',
          'Jupyter Notebook': 'python'
        };
        
        const sortedLangs = Object.entries(langs).sort((a, b) => b[1] - a[1]);
        const detectedSkills = sortedLangs.map(l => langMap[l[0]]).filter(Boolean);
        
        if (detectedSkills.length > 0) {
          // Merge with current frontend/backend/etc. For simplicity, we can just ensure they exist in the categories
          const newCategories = [...config.skills.categories];
          detectedSkills.forEach(skillId => {
            const skillDef = PREDEFINED_SKILLS.find(s => s.id === skillId);
            if (skillDef) {
              const catIndex = newCategories.findIndex(c => c.name === skillDef.category);
              if (catIndex >= 0) {
                if (!newCategories[catIndex].skills.includes(skillDef.name)) {
                  newCategories[catIndex].skills.push(skillDef.name);
                }
              }
            }
          });
          updateSkills({ categories: newCategories });
        }
      }
    } catch (err) {
      console.error('Failed to fetch GitHub profile:', err);
    } finally {
      setIsFetchingGithub(false);
    }
  };

  const toggleSkill = (categoryName: string, skillName: string) => {
    const newCategories = [...config.skills.categories];
    const catIndex = newCategories.findIndex(c => c.name === categoryName);
    if (catIndex >= 0) {
      const skills = newCategories[catIndex].skills;
      if (skills.includes(skillName)) {
        newCategories[catIndex].skills = skills.filter(s => s !== skillName);
      } else {
        newCategories[catIndex].skills.push(skillName);
      }
      updateSkills({ categories: newCategories });
    } else {
      newCategories.push({ name: categoryName, skills: [skillName] });
      updateSkills({ categories: newCategories });
    }
  };

  const skillsByCategory = getSkillsByCategory();


  return (
    <div className="flex flex-col gap-6 pb-12 w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-border/50 gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">Profile Settings</h2>
          <p className="text-sm text-muted-foreground mt-1">Customize your readme profile details and appearance.</p>
        </div>
        <Select value={config.theme} onValueChange={(val: any) => updateTheme(val)}>
          <SelectTrigger className="w-full sm:w-[180px] bg-card/50 backdrop-blur-sm border-border/50 hover:bg-accent/50 transition-colors shadow-sm">
            <SelectValue placeholder="Select Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tokyo-night">Tokyo Night</SelectItem>
            <SelectItem value="catppuccin-mocha">Catppuccin</SelectItem>
            <SelectItem value="cyberpunk">Cyberpunk</SelectItem>
            <SelectItem value="nord">Nord</SelectItem>
            <SelectItem value="solarized-dark">Solarized Dark</SelectItem>
            <SelectItem value="github-dark">GitHub Dark</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Accordion multiple defaultValue={['personal-info']} className="w-full space-y-4">
        
        {/* Personal Info */}
        <AccordionItem value="personal-info" className="border border-border/50 bg-card/30 hover:bg-card/50 transition-colors backdrop-blur-sm rounded-xl overflow-hidden shadow-sm">
          <AccordionTrigger className="hover:no-underline px-5 py-4 font-semibold text-base group">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                <UserCircle className="w-4 h-4" />
              </div>
              Personal Info & Header
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-5 px-5 pb-5 pt-1">
            <div className="p-4 bg-muted/40 rounded-xl border border-border/50 space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <GitBranch className="w-4 h-4" />
                Auto-fill from GitHub
              </div>
              <div className="flex gap-2">
                <Input 
                  value={githubUsernameInput} 
                  onChange={(e) => setGithubUsernameInput(e.target.value)} 
                  placeholder="Enter GitHub username" 
                  className="bg-background"
                />
                <Button 
                  onClick={fetchGithubProfile} 
                  disabled={isFetchingGithub || !githubUsernameInput}
                  className="shrink-0"
                >
                  {isFetchingGithub ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                  Fetch Profile
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">This will overwrite your current details and auto-select your top languages.</p>
            </div>
            
            <div className="space-y-2">
              <Label>Name</Label>
              <Input 
                value={config.header.name} 
                onChange={(e) => updateHeader({ name: e.target.value })} 
                placeholder="Hamza Rihani" 
              />
            </div>
            <div className="space-y-2">
              <Label>Typing Titles (Comma separated)</Label>
              <Input 
                value={config.header.typingTitles.join(', ')} 
                onChange={(e) => updateHeader({ typingTitles: e.target.value.split(',').map(s => s.trim()) })} 
                placeholder="Developer, Designer, Creator" 
              />
            </div>
            <div className="space-y-2">
              <Label>Header Alignment</Label>
              <Select value={config.header.alignment} onValueChange={(v) => v && updateHeader({ alignment: v as 'left'|'center'|'right' })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* About Me */}
        <AccordionItem value="about-me" className="border border-border/50 bg-card/30 hover:bg-card/50 transition-colors backdrop-blur-sm rounded-xl overflow-hidden shadow-sm">
          <AccordionTrigger className="hover:no-underline px-5 py-4 font-semibold text-base group">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                <FileText className="w-4 h-4" />
              </div>
              About Me
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-5 px-5 pb-5 pt-1">
            <div className="space-y-2">
              <Label>Bio (Markdown supported)</Label>
              <Textarea 
                value={config.about.bioMarkdown} 
                onChange={(e) => updateAbout({ bioMarkdown: e.target.value })} 
                rows={4} 
              />
            </div>
            <div className="space-y-2">
              <Label>Location</Label>
              <Input 
                value={config.about.location} 
                onChange={(e) => updateAbout({ location: e.target.value })} 
              />
            </div>
            <div className="space-y-2">
              <Label>Current Focus</Label>
              <Input 
                value={config.about.currentFocus} 
                onChange={(e) => updateAbout({ currentFocus: e.target.value })} 
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Tech Stack */}
        <AccordionItem value="tech-stack" className="border border-border/50 bg-card/30 hover:bg-card/50 transition-colors backdrop-blur-sm rounded-xl overflow-hidden shadow-sm">
          <AccordionTrigger className="hover:no-underline px-5 py-4 font-semibold text-base group">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                <Code2 className="w-4 h-4" />
              </div>
              Tech Stack & Skills
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-5 px-5 pb-5 pt-1">
            <div className="space-y-8 pt-2">
              {Object.entries(skillsByCategory).map(([categoryName, skills]) => {
                const activeCategory = config.skills.categories.find(c => c.name === categoryName);
                const activeSkills = activeCategory ? activeCategory.skills : [];
                
                return (
                  <div key={categoryName} className="space-y-3">
                    <Label className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">{categoryName}</Label>
                    <div className="flex flex-wrap gap-2">
                      {skills.map(skill => {
                        const isSelected = activeSkills.includes(skill.name);
                        const isDark = config.theme.includes('dark') || ['tokyo-night', 'catppuccin-mocha', 'cyberpunk'].includes(config.theme);
                        return (
                          <button
                            key={skill.id}
                            onClick={() => toggleSkill(categoryName, skill.name)}
                            className={`cursor-pointer relative group p-1.5 rounded-lg border transition-all ${
                              isSelected 
                                ? 'border-primary bg-primary/10 shadow-sm' 
                                : 'border-border/40 hover:border-border bg-card/40 opacity-70 hover:opacity-100'
                            }`}
                            title={skill.name}
                          >
                            <img 
                              src={`https://skillicons.dev/icons?i=${skill.id}&theme=${isDark ? 'dark' : 'light'}`} 
                              alt={skill.name} 
                              className="w-8 h-8 md:w-10 md:h-10 transition-transform group-hover:scale-110"
                            />
                            {isSelected && (
                              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Stats & Charts */}
        <AccordionItem value="stats-charts" className="border border-border/50 bg-card/30 hover:bg-card/50 transition-colors backdrop-blur-sm rounded-xl overflow-hidden shadow-sm">
          <AccordionTrigger className="hover:no-underline px-5 py-4 font-semibold text-base group">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                <BarChart3 className="w-4 h-4" />
              </div>
              Stats & Charts Config
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-5 px-5 pb-5 pt-1">
            <div className="space-y-2">
              <Label>GitHub Username</Label>
              <Input 
                value={config.chartsAndStats.githubUsername} 
                onChange={(e) => updateChartsAndStats({ githubUsername: e.target.value })} 
                placeholder="Your GitHub Username"
              />
            </div>
            <div className="space-y-2 pt-2 pb-4 border-b border-border/50">
              <Label>Layout Style</Label>
              <Select value={config.chartsAndStats.layoutStyle} onValueChange={(val: any) => updateChartsAndStats({ layoutStyle: val })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="stacked">Stacked (Default)</SelectItem>
                  <SelectItem value="bento">Bento Grid (Modular)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between pt-2">
              <Label>Show GitHub Stats</Label>
              <Switch 
                checked={config.chartsAndStats.showGithubStats}
                onCheckedChange={(val) => updateChartsAndStats({ showGithubStats: val })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label>Show Streak Tracker</Label>
              <Switch 
                checked={config.chartsAndStats.showStreakTracker}
                onCheckedChange={(val) => updateChartsAndStats({ showStreakTracker: val })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label>Show Top Languages</Label>
              <Switch 
                checked={config.chartsAndStats.showTopLanguages}
                onCheckedChange={(val) => updateChartsAndStats({ showTopLanguages: val })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label>Show Isometric 3D City</Label>
              <Switch 
                checked={config.chartsAndStats.show3dProfile}
                onCheckedChange={(val) => updateChartsAndStats({ show3dProfile: val })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label>Show Activity Pulse Graph</Label>
              <Switch 
                checked={config.chartsAndStats.showCommitActivityGraph}
                onCheckedChange={(val) => updateChartsAndStats({ showCommitActivityGraph: val })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label>Show Developer Radar Chart</Label>
              <Switch 
                checked={config.chartsAndStats.showRadar}
                onCheckedChange={(val) => updateChartsAndStats({ showRadar: val })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label>Show Retro Terminal</Label>
              <Switch 
                checked={config.chartsAndStats.showRetroTerminal}
                onCheckedChange={(val) => updateChartsAndStats({ showRetroTerminal: val })}
              />
            </div>
          </AccordionContent>
        </AccordionItem>



      </Accordion>
    </div>
  );
}
