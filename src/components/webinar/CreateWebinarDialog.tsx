
'use client';

import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

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
import { CalendarIcon, Clock, Check, UploadCloud } from 'lucide-react';

const basicInfoSchema = z.object({
  webinarName: z.string().min(1, 'Webinar name is required'),
  description: z.string().min(1, 'Description is required'),
  webinarDate: z.date({ required_error: 'Date is required' }),
  webinarHour: z.string().min(1, 'Hour is required'),
  webinarMinute: z.string().min(1, 'Minute is required'),
  webinarPeriod: z.enum(['AM', 'PM'], { required_error: 'AM/PM is required' }),
  preRecordedVideo: z.instanceof(File).optional().nullable(),
});

type BasicInfoFormData = z.infer<typeof basicInfoSchema>;

interface Step {
  id: number;
  name: string;
  description: string;
  status: 'current' | 'upcoming' | 'complete';
}

const initialSteps: Step[] = [
  { id: 1, name: 'Basic Information', description: 'Please fill out the standard info needed for your webinar', status: 'current' },
  { id: 2, name: 'CTA', description: 'Please provide the end-point for your customers through your webinar', status: 'upcoming' },
  { id: 3, name: 'Additional Information', description: 'Please fill out information about additional options if necessary', status: 'upcoming' },
];

const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

export function CreateWebinarDialog({ trigger }: { trigger: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [steps, setSteps] = useState<Step[]>(initialSteps);
  const [currentStep, setCurrentStep] = useState(1); // For now, only step 1 is implemented

  const form = useForm<BasicInfoFormData>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      webinarName: '',
      description: '',
      webinarHour: '12',
      webinarMinute: '00',
      webinarPeriod: 'PM',
      preRecordedVideo: null,
    },
  });

  function onSubmit(data: BasicInfoFormData) {
    console.log('Form Data Submitted:', data);
    // Handle form submission, e.g., proceed to next step or save data
    // For now, let's just close the dialog
    setIsOpen(false); 
    form.reset(); // Reset form after submission
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open);
      if (!open) {
        form.reset(); // Reset form when dialog is closed
      }
    }}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-3xl md:max-w-4xl lg:max-w-5xl p-0 overflow-hidden">
        <div className="flex min-h-[500px]">
          {/* Stepper Section */}
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

          {/* Form Section */}
          <div className="w-2/3 p-8 flex flex-col">
            {currentStep === 1 && (
              <>
                <DialogHeader className="mb-6 text-left px-0 pt-0">
                  <DialogTitle className="text-xl">Basic Information</DialogTitle>
                  <p className="text-sm text-muted-foreground">
                    Please fill out the standard info needed for your webinar.
                  </p>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex-grow flex flex-col justify-between">
                    <div className="space-y-4 overflow-y-auto px-2 max-h-[calc(500px-200px)]">
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
                                  disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))} // Disable past dates
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="grid grid-cols-3 gap-4">
                        <FormField
                          control={form.control}
                          name="webinarHour"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Hour *</FormLabel>
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
                              <FormLabel>Minute *</FormLabel>
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
                              <FormLabel>AM/PM *</FormLabel>
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
                      <FormField
                        control={form.control}
                        name="preRecordedVideo"
                        render={({ field }) => (
                          <FormItem className="pt-2">
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
                    </div>
                    <DialogFooter className="pt-6 mt-auto">
                       <DialogClose asChild>
                        <Button type="button" variant="ghost">Cancel</Button>
                       </DialogClose>
                      <Button type="submit">Next</Button>
                    </DialogFooter>
                  </form>
                </Form>
              </>
            )}
            {/* Placeholder for other steps */}
            {currentStep === 2 && <div>CTA Step Content</div>}
            {currentStep === 3 && <div>Additional Information Step Content</div>}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
