"use client";
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Plus, Tags } from 'lucide-react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { createJobApplication } from '@/lib/actions/job-applications';
import toast from 'react-hot-toast';

interface CreateJobApplicationDialogProps {
    columnId: string;
    boardId: string;
}

const INITIAL_FORM_DATA = {
    company: "",
    position: "",
    location: "",
    notes: "",
    salary: "",
    jobUrl: "",
    tags: "",
    description: "",
}

const CreateJobApplicationDialog = ({
    columnId,
    boardId,
} : CreateJobApplicationDialogProps
) => {

    const [open, setOpen] = useState<boolean>(false);
    const [formData, setFormData] = useState(INITIAL_FORM_DATA);

    async function handleSubmit(e: React.FormEvent){
        e.preventDefault();

        try {
            const result = await createJobApplication({
                ...formData, 
                tags: formData.tags
                    .split(",")
                    .map(tag => tag.trim())
                    .filter(tag => tag.length > 0),
                boardId, 
                columnId
            });

            if(!result.error){
                setFormData(INITIAL_FORM_DATA);
                setOpen(false);
                toast.success("Job application created!");
            } else {
                toast.error(result.error)
                console.log("Failed to create job: ", result.error);
            }
        } catch (error) {
           console.error(error); 
        }
    }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
            variant={"outline"}
            className='w-full mb-4 justify-start text-muted-foreground border-dashed'
        >
            <Plus className='mr-2 h-4 w-4'/>
            Add Job
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-2xl'>
        <DialogHeader>
            <DialogTitle>
                Add Job Application
            </DialogTitle>
            <DialogDescription>
                Track a new job application
            </DialogDescription>
        </DialogHeader>
        <form className='space-y-4' onSubmit={handleSubmit}>
            <div className='space-y-4'>
                <div className='grid grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                        <Label htmlFor='company'>Company *</Label>
                        <Input id='company' 
                            required 
                            value={formData.company}
                            onChange={(e) => setFormData({...formData, company: e.target.value})}
                        />
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor='position'>Position *</Label>
                        <Input 
                            id='position' 
                            required
                            value={formData.position}
                            onChange={(e) => setFormData({...formData, position: e.target.value})}
                        />
                    </div>
                </div>

                <div className='grid grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                        <Label htmlFor='location'>Location</Label>
                        <Input 
                            id='location'
                            value={formData.location}
                            onChange={(e) => setFormData({...formData, location: e.target.value})}
                        />
                    </div>
                    <div>
                        <Label htmlFor='salary'>Salary</Label>
                        <Input 
                            id='salary' 
                            value={formData.salary}
                            placeholder='e.g $100k - $150k'
                            onChange={(e) => setFormData({...formData, salary: e.target.value})}
                        />
                    </div>
                </div>

                <div className='space-y-2'>
                    <Label htmlFor='jobUrl'>Job URL</Label>
                    <Input 
                        id='jobUrl' 
                        placeholder='https://...'
                        value={formData.jobUrl}
                        onChange={(e) => setFormData({...formData, jobUrl: e.target.value})}
                    />
                </div>
                <div className='space-y-2'>
                    <Label htmlFor='tags'>Tags (comma-separated)</Label>
                    <Input 
                        id='tags' 
                        placeholder='React, Tailwind, High pay'
                        value={formData.tags}
                        onChange={(e) => setFormData({...formData, tags: e.target.value})}
                    />
                </div>
                <div className='space-y-2'>
                    <Label htmlFor='description'>Description</Label>
                    <Textarea 
                        id='description' 
                        rows={3} 
                        placeholder='Brief description of the role...'
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                    />
                </div>
                <div className='space-y-2'>
                    <Label htmlFor='notes'>Notes</Label>
                    <Textarea 
                        rows={4} id='notes' 
                        placeholder=''
                        value={formData.notes}
                        onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    />
                </div>
            </div>

            <DialogFooter>
                <Button 
                    type='button'
                    variant={"outline"}
                    onClick={() => setOpen(false)}
                >
                    Cancel
                </Button>
                <Button type='submit'>
                    Add Application
                </Button>
            </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateJobApplicationDialog
