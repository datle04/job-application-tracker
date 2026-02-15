'use client';
import { Column, JobApplication } from '@/lib/models/models.types';
import React from 'react'
import JobApplicationCard from './job-application-card';

interface JobCardProps {
    job: JobApplication;
    columns: Column[];
}

const SortableJobCard = ({ job, columns } : JobCardProps) => {
  return (
    <div>
      <JobApplicationCard job={job} columns={columns}/>
    </div>
  )
}

export default SortableJobCard;
