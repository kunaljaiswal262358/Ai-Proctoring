import { StatsCard } from "./StatsCard";

export const StatsPanel = ({ questions, exams }) => {
  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatsCard 
        title="Total Questions" 
        value={questions.length} 
        description="In question bank" 
        color="blue"
      />
      <StatsCard 
        title="Total Exams" 
        value={exams.length} 
        description="Created" 
        color="green"
      />
      <StatsCard 
        title="Average Questions" 
        value={exams.length > 0 ? Math.round(questions.length / exams.length) : 0} 
        description="Per exam" 
        color="purple"
      />
    </div>
  );
};