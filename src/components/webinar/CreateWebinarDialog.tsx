
'use client';

import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useToast } from "@/hooks/use-toast";

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch";
import { CalendarIcon, Clock, Check, UploadCloud, Search, CheckCircle2, Copy, ExternalLink, RefreshCw } from 'lucide-react';

const webinarCreationSchema = z.object({
  webinarName: z.string().min(1, 'Webinar name is required'),
  description: z.string().min(1, 'Description is required'),
  webinarDate: z.date({ required_error: 'Date is required' }),
  webinarHour: z.string().min(1, 'Hour is required'),
  webinarMinute: z.string().min(1, 'Minute is required'),
  webinarPeriod: z.enum(['AM', 'PM'], { required_error: 'AM/PM is required' }),
  preRecordedVideo: z.instanceof(File).optional().nullable(),
  // CTA Fields
  ctaLabel: z.string().min(1, 'CTA Label is required'),
  ctaTags: z.string().optional(),
  ctaType: z.enum(['book_call', 'buy_now'], { required_error: 'CTA Type is required' }),
  ctaProductSearch: z.string().optional(),
  ctaSelectedProduct: z.string().optional(),
  // Additional Information Fields
  lockChat: z.boolean().optional().default(false),
  couponCode: z.boolean().optional().default(false),
});

type WebinarCreationFormData = z.infer<typeof webinarCreationSchema>;

interface Step {
  id: number;
  name: string;
  description: string;
  status: 'current' | 'upcoming' | 'complete';
  fields?: (keyof WebinarCreationFormData)[];
}

const initialSteps: Step[] = [
  {
    id: 1,
    name: 'Basic Information',
    description: 'Please fill out the standard info needed for your webinar',
    status: 'current',
    fields: ['webinarName', 'description', 'webinarDate', 'webinarHour', 'webinarMinute', 'webinarPeriod', 'preRecordedVideo']
  },
  {
    id: 2,
    name: 'CTA',
    description: 'Please provide the end-point for your customers through your webinar',
    status: 'upcoming',
    fields: ['ctaLabel', 'ctaTags', 'ctaType', 'ctaProductSearch', 'ctaSelectedProduct']
  },
  {
    id: 3,
    name: 'Additional Information',
    description: 'Please fill out information about additional options if necessary',
    status: 'upcoming',
    fields: ['lockChat', 'couponCode']
  },
];

const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

const SuccessScreen = ({ webinarLink, onCreateAnother, onPreview }: { webinarLink: string; onCreateAnother: () => void; onPreview: () => void; }) => {
  const { toast } = useToast();

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(webinarLink).then(() => {
      toast({
        title: "Link Copied!",
        description: "Webinar link copied to clipboard.",
      });
    }).catch(err => {
      console.error('Failed to copy link: ', err);
      toast({
        title: "Error",
        description: "Failed to copy link.",
        variant: "destructive",
      });
    });
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center space-y-6 min-h-[480px]">
      <CheckCircle2 className="h-16 w-16 text-green-500" />
      <h2 className="text-2xl font-semibold text-foreground">Your webinar has been created</h2>
      <p className="text-muted-foreground max-w-xs">
        You can share the link with your viewers for them to join
      </p>
      <div className="flex w-full max-w-sm items-center space-x-2 pt-2">
        <Input type="text" value={webinarLink} readOnly className="flex-1 bg-muted/50 border-border" />
        <Button type="button" variant="outline" size="icon" onClick={handleCopyToClipboard}>
          <Copy className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm pt-4">
        <Button type="button" variant="outline" className="w-full sm:flex-1" onClick={onPreview}>
          <ExternalLink className="mr-2 h-4 w-4" /> Preview Webinar
        </Button>
        <Button type="button" variant="default" className="w-full sm:flex-1" onClick={onCreateAnother}>
          <RefreshCw className="mr-2 h-4 w-4" /> Create Another Webinar
        </Button>
      </div>
    </div>
  );
};


export function CreateWebinarDialog({ trigger }: { trigger: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [steps, setSteps] = useState<Step[]>(initialSteps);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSuccessScreenVisible, setIsSuccessScreenVisible] = useState(false);
  const [generatedWebinarLink, setGeneratedWebinarLink] = useState('');


  const form = useForm<WebinarCreationFormData>({
    resolver: zodResolver(webinarCreationSchema),
    defaultValues: {
      webinarName: '',
      description: '',
      webinarHour: '12',
      webinarMinute: '00',
      webinarPeriod: 'PM',
      preRecordedVideo: null,
      ctaLabel: '',
      ctaTags: '',
      // ctaType: 'buy_now', // Default to one option or leave undefined to force selection
      ctaProductSearch: '',
      ctaSelectedProduct: '',
      lockChat: false,
      couponCode: false,
    },
     shouldFocusError: true,
  });

  const activeStep = steps.find(s => s.id === currentStep);

  const proceedToNextStepUI = () => {
    if (currentStep < steps.length) {
      setSteps(prevSteps =>
        prevSteps.map(s =>
          s.id === currentStep ? { ...s, status: 'complete' } :
          s.id === currentStep + 1 ? { ...s, status: 'current' } : s
        )
      );
      setCurrentStep(currentStep + 1);
    } else if (currentStep === steps.length) {
      // This is the "Finish" case
      form.handleSubmit(onSubmit)(); // Trigger actual submission
    }
  };

  const handleNextStep = async () => {
    const currentStepConfig = steps.find(s => s.id === currentStep);

    if (!currentStepConfig || !currentStepConfig.fields || currentStepConfig.fields.length === 0) {
      proceedToNextStepUI();
      return;
    }

    const isValid = await form.trigger(currentStepConfig.fields);
    if (isValid) {
      proceedToNextStepUI();
    } else {
      console.log(`Validation failed for step ${currentStep}`, form.formState.errors);
    }
  };


  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setSteps(prevSteps =>
        prevSteps.map(s =>
          s.id === currentStep ? { ...s, status: 'upcoming' } :
          s.id === currentStep - 1 ? { ...s, status: 'current' } : s
        )
      );
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = async () => {
    const lastStepConfig = steps.find(s => s.id === currentStep);
    if (lastStepConfig && lastStepConfig.fields && lastStepConfig.fields.length > 0) {
      const isValidLastStep = await form.trigger(lastStepConfig.fields);
      if (!isValidLastStep) {
         console.log(`Validation failed for final step ${currentStep}`, form.formState.errors);
        return;
      }
    }
    // This will call onSubmit if all fields are valid
    form.handleSubmit(onSubmit)();
  };

  const onSubmit = async (data: WebinarCreationFormData) => {
    console.log('Form Data Submitted:', data);
    // Here you would typically send the data to your backend
    // For now, simulate link generation and show success screen
    const mockLink = `http://localhost:3000/live-webinar/${Date.now().toString(36)}-${Math.random().toString(36).substring(2)}`;
    setGeneratedWebinarLink(mockLink);
    setIsSuccessScreenVisible(true);
    // We don't close the dialog or reset the form here, that's handled by "Create Another" or closing the dialog
  };


  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) {
          form.reset();
          setSteps(initialSteps);
          setCurrentStep(1);
          setIsSuccessScreenVisible(false);
          setGeneratedWebinarLink('');
        }
      }}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className={cn(
          "p-0", 
          isSuccessScreenVisible 
            ? "sm:max-w-xl" 
            : "sm:max-w-3xl md:max-w-4xl lg:max-w-5xl overflow-hidden" 
        )}>
          {isSuccessScreenVisible ? (
            <SuccessScreen
              webinarLink={generatedWebinarLink}
              onCreateAnother={() => {
                form.reset();
                setSteps(initialSteps);
                setCurrentStep(1);
                setIsSuccessScreenVisible(false);
                setGeneratedWebinarLink('');
              }}
              onPreview={() => {
                if (generatedWebinarLink) {
                  window.open(generatedWebinarLink, '_blank');
                }
              }}
            />
          ) : (
            <div className="flex min-h-[550px]">
              <div className="w-1/3 bg-muted/30 p-8 border-r border-border flex flex-col justify-center">
                <nav aria-label="Progress">
                  <ol role="list" className="space-y-6">
                    {steps.map((step, stepIdx) => (
                      <li key={step.name} className="relative">
                        {stepIdx !== steps.length - 1 ? (
                          <div className="absolute left-3.5 top-4 -ml-px mt-0.5 h-full w-0.5 bg-border" aria-hidden="true" />
                        ) : null}
                        <div className="group relative flex items-start">
                          <span className="flex h-8 items-center" aria-hidden="true">
                            <span
                              className={cn(
                                'relative z-10 flex h-7 w-7 items-center justify-center rounded-full',
                                step.status === 'complete' ? 'iconBackground' :
                                step.status === 'current' ? 'border-2 border-primary bg-background' :
                                'border-2 border-border bg-background'
                              )}
                            >
                              {step.status === 'complete' ? (
                                <Check className="h-4 w-4 text-foreground" />
                              ) : (
                                <span
                                  className={cn(
                                    'text-xs',
                                    step.status === 'current' ? 'text-primary' : 'text-muted-foreground'
                                  )}
                                >
                                  {step.id}
                                </span>
                              )}
                            </span>
                          </span>
                          <span className="ml-4 flex min-w-0 flex-col">
                            <span
                              className={cn(
                                'text-sm font-medium',
                                step.status === 'current' ? 'text-primary' : 'text-foreground'
                              )}
                            >
                              {step.name}
                            </span>
                            <span className="text-xs text-muted-foreground">{step.description}</span>
                          </span>
                        </div>
                      </li>
                    ))}
                  </ol>
                </nav>
              </div>

              <div className="w-2/3 p-8 flex flex-col">
                <DialogHeader className="mb-6 text-left px-0 pt-0">
                  <DialogTitle className="text-xl">{activeStep?.name}</DialogTitle>
                  <p className="text-sm text-muted-foreground">
                    {activeStep?.description}
                  </p>
                </DialogHeader>

                <Form {...form}>
                  <form className="flex-grow flex flex-col">
                    <div className="space-y-4 px-2 overflow-y-auto flex-1 min-h-0 pb-4">
                      {currentStep === 1 && (
                        <>
                          <FormField
                            control={form.control}
                            name="webinarName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Webinar name *</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g., Product Demo Q3" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Description *</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Tell customers what your webinar is about..."
                                    className="min-h-[100px]"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                           <div className="grid grid-cols-2 gap-x-4 items-end pt-2">
                             <FormField
                              control={form.control}
                              name="webinarDate"
                              render={({ field }) => (
                                <FormItem className="flex flex-col">
                                  <FormLabel>Webinar Date *</FormLabel>
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <FormControl>
                                        <Button
                                          variant="outline"
                                          className={cn(
                                            'w-full pl-3 text-left font-normal',
                                            !field.value && 'text-muted-foreground'
                                          )}
                                        >
                                          {field.value ? (
                                            format(field.value, 'PPP')
                                          ) : (
                                            <span>Select date</span>
                                          )}
                                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                      </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                      <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))}
                                        initialFocus
                                      />
                                    </PopoverContent>
                                  </Popover>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <div className="space-y-2">
                               <FormLabel className="flex items-center text-sm font-medium">
                                Webinar Time *
                                <Clock size={16} className="ml-1.5 opacity-70" />
                              </FormLabel>
                              <div className="grid grid-cols-3 gap-x-2">
                                <FormField
                                  control={form.control}
                                  name="webinarHour"
                                  render={({ field }) => (
                                    <FormItem>
                                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                          <SelectTrigger>
                                            <SelectValue placeholder="HH" />
                                          </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                          {hours.map(hour => (
                                            <SelectItem key={hour} value={hour}>{hour}</SelectItem>
                                          ))}
                                        </SelectContent>
                                      </Select>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={form.control}
                                  name="webinarMinute"
                                  render={({ field }) => (
                                    <FormItem>
                                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                          <SelectTrigger>
                                            <SelectValue placeholder="MM" />
                                          </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                          {minutes.map(minute => (
                                            <SelectItem key={minute} value={minute}>{minute}</SelectItem>
                                          ))}
                                        </SelectContent>
                                      </Select>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={form.control}
                                  name="webinarPeriod"
                                  render={({ field }) => (
                                    <FormItem>
                                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                          <SelectTrigger>
                                            <SelectValue placeholder="AM/PM" />
                                          </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                          <SelectItem value="AM">AM</SelectItem>
                                          <SelectItem value="PM">PM</SelectItem>
                                        </SelectContent>
                                      </Select>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </div>
                          </div>
                          <FormField
                            control={form.control}
                            name="preRecordedVideo"
                            render={({ field }) => (
                               <FormItem className="pt-2 grid items-center gap-1.5">
                                <FormLabel>Pre-recorded Video (Optional)</FormLabel>
                                <FormControl>
                                  <Input
                                    type="file"
                                    accept="video/*"
                                    name={field.name}
                                    ref={field.ref}
                                    onBlur={field.onBlur}
                                    onChange={(e) => {
                                      field.onChange(e.target.files && e.target.files.length > 0 ? e.target.files[0] : null);
                                    }}
                                    className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
                                  />
                                </FormControl>
                                <FormDescription>
                                  <UploadCloud className="inline h-3 w-3 mr-1 opacity-70"/>
                                  Uploading a video makes this webinar pre-recorded.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </>
                      )}
                      {currentStep === 2 && (
                        <div className="space-y-6">
                          <FormField
                            control={form.control}
                            name="ctaLabel"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>CTA Label *</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g., Grab this limited time discount!" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="ctaTags"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Tags</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g., Promotion, Urgent, New" {...field} />
                                </FormControl>
                                <FormDescription>
                                  Comma-separated tags for your CTA.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="ctaType"
                            render={({ field }) => (
                              <FormItem className="space-y-3">
                                <FormLabel>CTA Type *</FormLabel>
                                <FormControl>
                                  <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex gap-4"
                                  >
                                    <FormItem className="flex-1">
                                      <FormControl>
                                        <RadioGroupItem value="book_call" id="book_call" className="sr-only" />
                                      </FormControl>
                                      <Label
                                        htmlFor="book_call"
                                        className={cn(
                                          "flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer h-full",
                                          field.value === "book_call" && "border-primary"
                                        )}
                                      >
                                        Book a Call
                                      </Label>
                                    </FormItem>
                                    <FormItem className="flex-1">
                                      <FormControl>
                                        <RadioGroupItem value="buy_now" id="buy_now" className="sr-only" />
                                      </FormControl>
                                      <Label
                                        htmlFor="buy_now"
                                        className={cn(
                                          "flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer h-full",
                                          field.value === "buy_now" && "border-primary"
                                        )}
                                      >
                                        Buy Now
                                      </Label>
                                    </FormItem>
                                  </RadioGroup>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Attach an Product</Label>
                            <FormField
                              control={form.control}
                              name="ctaProductSearch"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <div className="relative">
                                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                      <Input placeholder="Search agents" className="pl-10" {...field} />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="ctaSelectedProduct"
                              render={({ field }) => (
                                <FormItem>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select an product" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="product1">Product 1 - AI Assistant</SelectItem>
                                      <SelectItem value="product2">Product 2 - Sales Bot</SelectItem>
                                      <SelectItem value="product3">Product 3 - Service Agent</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      )}
                      {currentStep === 3 && (
                         <div className="space-y-6">
                          <FormField
                            control={form.control}
                            name="lockChat"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                  <FormLabel className="text-base">
                                    Lock Chat
                                  </FormLabel>
                                  <FormDescription>
                                    Turn it on to make chat visible to your users at all time.
                                  </FormDescription>
                                </div>
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="couponCode"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                  <FormLabel className="text-base">
                                    Coupon Code
                                  </FormLabel>
                                  <FormDescription>
                                    Turn it on to offer discounts to your viewers.
                                  </FormDescription>
                                </div>
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                      )}
                    </div>

                    <DialogFooter className="pt-6 mt-auto sticky bottom-0 bg-background pb-8 px-8 -mx-8 border-t border-border">
                      {currentStep === 1 && (
                         <>
                          <DialogClose asChild>
                            <Button type="button" variant="ghost">Cancel</Button>
                          </DialogClose>
                          <Button type="button" onClick={handleNextStep}>Next</Button>
                        </>
                      )}
                      {currentStep > 1 && currentStep < steps.length && (
                        <>
                          <Button type="button" variant="ghost" onClick={handlePreviousStep}>Back</Button>
                          <Button type="button" onClick={handleNextStep}>Next</Button>
                        </>
                      )}
                       {currentStep === steps.length && (
                        <>
                          <Button type="button" variant="ghost" onClick={handlePreviousStep}>Back</Button>
                          <Button type="button" onClick={handleFinish}>Finish</Button>
                        </>
                      )}
                    </DialogFooter>
                  </form>
                </Form>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

