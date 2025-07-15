import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, TrendingUp, MessageCircle, Target, Lightbulb, Star, Settings, Hash, FileText } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// Import AI-generated images
import aiSalesPersonImage from '@/assets/ai-sales-person.jpg';
import personaIcon from '@/assets/persona-icon.jpg';
import discIcon from '@/assets/disc-icon.jpg';
import sentimentIcon from '@/assets/sentiment-icon.jpg';
import modulesIcon from '@/assets/modules-icon.jpg';
import messageIcon from '@/assets/message-icon.jpg';
import ctaIcon from '@/assets/cta-icon.jpg';
import toneIcon from '@/assets/tone-icon.jpg';
import confidenceIcon from '@/assets/confidence-icon.jpg';
import tagsIcon from '@/assets/tags-icon.jpg';
import traceIcon from '@/assets/trace-icon.jpg';

const PersonaLens = () => {
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [callTranscript, setCallTranscript] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [imochaRepName, setImochaRepName] = useState('');
  const [selectedICP, setSelectedICP] = useState('');
  const [contextualInfo, setContextualInfo] = useState('');
  const [showResults, setShowResults] = useState(false);

  const handleAnalyze = () => {
    if (!linkedinUrl && !callTranscript && !selectedICP) {
      toast({
        title: "Input Required",
        description: "Please provide at least one input (LinkedIn URL, Call Transcript, or ICP selection)",
        variant: "destructive"
      });
      return;
    }
    
    setShowResults(true);
    toast({
      title: "Analysis Complete",
      description: "PersonaLens has generated insights for your prospect",
    });
  };

  const ResultTile = ({ icon, image, title, description, children, confidence }: {
    icon: React.ReactNode;
    image: string;
    title: string;
    description: string;
    children: React.ReactNode;
    confidence?: number;
  }) => (
    <Card className="w-full hover:shadow-lg transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
            <img src={image} alt={title} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {icon}
              <CardTitle className="text-lg">{title}</CardTitle>
            </div>
            <CardDescription className="text-sm">{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {children}
        {confidence && (
          <div className="mt-4 pt-4 border-t">
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
              <span>Confidence Score</span>
              <span>{confidence}%</span>
            </div>
            <Progress value={confidence} className="h-2" />
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-background">
      {/* Header */}
      <div className="gradient-hero text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <Brain className="w-10 h-10" />
            <h1 className="text-4xl font-bold">PersonaLens</h1>
          </div>
          <p className="text-lg opacity-90">AI-Powered Sales Intelligence for iMocha</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Input Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Sales Intelligence Input</CardTitle>
            <CardDescription>
              Provide prospect information to generate personalized insights
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              {/* AI Sales Person Image */}
              <div className="order-2 md:order-1">
                <div className="relative">
                  <img 
                    src={aiSalesPersonImage} 
                    alt="AI-powered sales person with persona intelligence" 
                    className="w-full rounded-lg shadow-lg"
                  />
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2">
                    <p className="text-sm font-medium text-primary">AI-Powered Sales Intelligence</p>
                  </div>
                </div>
              </div>

              {/* Input Widgets */}
              <div className="order-1 md:order-2 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn Profile URL</Label>
                  <Input
                    id="linkedin"
                    placeholder="https://linkedin.com/in/prospect-name"
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="transcript">Call Transcript</Label>
                  <Textarea
                    id="transcript"
                    placeholder="Paste your call transcript here..."
                    className="min-h-[120px]"
                    value={callTranscript}
                    onChange={(e) => setCallTranscript(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="customer">Customer Name</Label>
                    <Input
                      id="customer"
                      placeholder="Customer name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rep">iMocha Rep Name</Label>
                    <Input
                      id="rep"
                      placeholder="Rep name"
                      value={imochaRepName}
                      onChange={(e) => setImochaRepName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="icp">Ideal Customer Profile (ICP)</Label>
                  <Select value={selectedICP} onValueChange={setSelectedICP}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select ICP role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="chro">CHRO</SelectItem>
                      <SelectItem value="ld">L&D</SelectItem>
                      <SelectItem value="ta">TA</SelectItem>
                      <SelectItem value="recruiter">Recruiter</SelectItem>
                      <SelectItem value="hrbp">HRBP</SelectItem>
                      <SelectItem value="mobility">Internal Mobility/Talent Transformation Lead</SelectItem>
                      <SelectItem value="ceo-coo">CEO/COO</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="context">Contextual Information</Label>
                  <Textarea
                    id="context"
                    placeholder="Any additional context or reference information..."
                    value={contextualInfo}
                    onChange={(e) => setContextualInfo(e.target.value)}
                  />
                </div>

                <Button 
                  onClick={handleAnalyze} 
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                  size="lg"
                >
                  <Brain className="w-4 h-4 mr-2" />
                  Analyze with PersonaLens
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        {showResults && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-primary mb-2">PersonaLens Insights</h2>
              <p className="text-muted-foreground">AI-generated sales intelligence for your prospect</p>
            </div>

            <div className="grid gap-6">
              <ResultTile
                icon={<Brain className="w-5 h-5 text-primary" />}
                image={personaIcon}
                title="1. Persona Classification"
                description="This identifies the stakeholder's role and strategic responsibilities to help tailor your messaging approach effectively."
              >
                <div className="space-y-3">
                  <div>
                    <Badge variant="secondary" className="text-sm">
                      {selectedICP ? selectedICP.toUpperCase() : 'VP L&D'}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <strong>Role:</strong> {selectedICP ? `${selectedICP.charAt(0).toUpperCase()}${selectedICP.slice(1)} Leader` : 'Vice President of Learning & Development'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Strategic Focus:</strong> Driving organizational capability development and skills transformation initiatives.
                  </p>
                </div>
              </ResultTile>

              <ResultTile
                icon={<TrendingUp className="w-5 h-5 text-primary" />}
                image={discIcon}
                title="2. DISC Personality Type"
                description="Behavioral analysis based on communication patterns helps inform message tone, timing, and call-to-action format."
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-primary/10 text-primary">Conscientiousness (C)</Badge>
                    <span className="text-sm text-muted-foreground">Primary Type</span>
                  </div>
                  <p className="text-sm">
                    <strong>Analysis:</strong> Language patterns suggest detail-oriented, analytical approach. Values data-driven decisions and thorough information.
                  </p>
                  <div className="grid grid-cols-4 gap-2 mt-3">
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground">D</div>
                      <Progress value={25} className="h-2 mt-1" />
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground">I</div>
                      <Progress value={35} className="h-2 mt-1" />
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground">S</div>
                      <Progress value={30} className="h-2 mt-1" />
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground">C</div>
                      <Progress value={85} className="h-2 mt-1" />
                    </div>
                  </div>
                </div>
              </ResultTile>

              <ResultTile
                icon={<MessageCircle className="w-5 h-5 text-primary" />}
                image={sentimentIcon}
                title="3. Sentiment Analysis"
                description="Detected emotional tone helps prioritize deal stage and prepare for objection handling strategies."
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-100 text-green-800">Positive</Badge>
                    <span className="text-sm text-muted-foreground">Overall Sentiment</span>
                  </div>
                  <p className="text-sm">
                    <strong>Emotion Driver:</strong> "Optimistic about digital transformation and upskilling initiatives"
                  </p>
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground">Positive</div>
                      <Progress value={75} className="h-2 mt-1" />
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground">Neutral</div>
                      <Progress value={20} className="h-2 mt-1" />
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground">Negative</div>
                      <Progress value={5} className="h-2 mt-1" />
                    </div>
                  </div>
                </div>
              </ResultTile>

              <ResultTile
                icon={<Settings className="w-5 h-5 text-primary" />}
                image={modulesIcon}
                title="4. Matching iMocha Modules"
                description="Product modules aligned to prospect's context and pain points to connect their challenges with platform capabilities."
              >
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Skills Inventory</Badge>
                    <Badge variant="outline">Career Pathing</Badge>
                    <Badge variant="outline">Adaptive Screening</Badge>
                    <Badge variant="outline">Learning Analytics</Badge>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm"><strong>Primary Match:</strong> Skills Inventory - addresses visibility into current workforce capabilities</p>
                    <p className="text-sm"><strong>Secondary:</strong> Career Pathing - supports talent mobility initiatives</p>
                  </div>
                </div>
              </ResultTile>

              <ResultTile
                icon={<Lightbulb className="w-5 h-5 text-primary" />}
                image={messageIcon}
                title="5. Personalized Value Message"
                description="Sales-ready content crafted in prospect's language for immediate use in emails, calls, or presentations."
              >
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm italic">
                    "Based on your focus on data-driven L&D transformation, iMocha's Skills Inventory can provide the workforce visibility you need to make strategic upskilling decisions. Our analytics show organizations like yours achieve 40% faster capability development when they start with comprehensive skills mapping."
                  </p>
                </div>
              </ResultTile>

              <ResultTile
                icon={<Target className="w-5 h-5 text-primary" />}
                image={ctaIcon}
                title="6. Suggested Call-to-Action"
                description="Conversation-driving ask aligned to sentiment and personality type to move the engagement forward strategically."
              >
                <div className="space-y-3">
                  <div className="bg-accent/10 p-4 rounded-lg border-l-4 border-accent">
                    <p className="text-sm font-medium">
                      "Would you be interested in seeing a 15-minute skills dashboard demo focused on your L&D transformation goals?"
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <strong>Why this works:</strong> Respects analytical nature with time-bound, specific offer while connecting to stated objectives.
                  </p>
                </div>
              </ResultTile>

              <ResultTile
                icon={<Star className="w-5 h-5 text-primary" />}
                image={toneIcon}
                title="7. Recommended Pitch Tone"
                description="Messaging style guidance helps sales reps frame their communication in a way that resonates with the prospect."
              >
                <div className="space-y-3">
                  <Badge className="bg-blue-100 text-blue-800">Data-led & Consultative</Badge>
                  <div className="space-y-2">
                    <p className="text-sm"><strong>Approach:</strong> Lead with metrics and case studies</p>
                    <p className="text-sm"><strong>Language:</strong> Professional, detailed, evidence-based</p>
                    <p className="text-sm"><strong>Timing:</strong> Allow processing time, avoid rushing decisions</p>
                  </div>
                </div>
              </ResultTile>

              <ResultTile
                icon={<Star className="w-5 h-5 text-primary" />}
                image={confidenceIcon}
                title="8. Weighted Confidence Score"
                description="Output reliability indicator based on input variety signals whether the response requires human review."
                confidence={78}
              >
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">LinkedIn Profile:</span>
                      <span className="ml-2 font-medium">{linkedinUrl ? '30%' : '0%'}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Call Transcript:</span>
                      <span className="ml-2 font-medium">{callTranscript ? '40%' : '0%'}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">ICP Selection:</span>
                      <span className="ml-2 font-medium">{selectedICP ? '20%' : '0%'}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Context Info:</span>
                      <span className="ml-2 font-medium">{contextualInfo ? '10%' : '0%'}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <strong>Recommendation:</strong> High confidence - proceed with insights. Consider gathering additional context for even more precision.
                  </p>
                </div>
              </ResultTile>

              <ResultTile
                icon={<Hash className="w-5 h-5 text-primary" />}
                image={tagsIcon}
                title="9. Contextual Tags"
                description="Thematic categorization helps cluster prospects and trigger relevant playbooks for consistent sales processes."
              >
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-purple-100 text-purple-800">Reskilling</Badge>
                    <Badge className="bg-green-100 text-green-800">Digital Transformation</Badge>
                    <Badge className="bg-blue-100 text-blue-800">Skills Analytics</Badge>
                    <Badge className="bg-orange-100 text-orange-800">Workforce Planning</Badge>
                    <Badge className="bg-pink-100 text-pink-800">Career Development</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    These tags can be used to automatically trigger relevant case studies, content, and follow-up sequences.
                  </p>
                </div>
              </ResultTile>

              <ResultTile
                icon={<FileText className="w-5 h-5 text-primary" />}
                image={traceIcon}
                title="10. Prompt Trace"
                description="Internal logic transparency for quality assurance and model tuning improves system reliability over time."
              >
                <div className="space-y-3">
                  <div className="bg-muted/30 p-3 rounded font-mono text-xs">
                    <div>Input Processing: ✓ LinkedIn URL parsed</div>
                    <div>Sentiment Analysis: ✓ Positive tone detected</div>
                    <div>DISC Mapping: ✓ Conscientiousness profile identified</div>
                    <div>Module Matching: ✓ Skills-focused recommendations</div>
                    <div>Message Generation: ✓ Data-driven tone applied</div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    This trace helps improve model accuracy and provides debugging information for continuous enhancement.
                  </p>
                </div>
              </ResultTile>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonaLens;
