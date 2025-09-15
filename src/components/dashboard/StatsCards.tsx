import { Users, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";

interface AttendanceRecord {
  date: string;
  studentId: string;
  studentName: string;
  status: string;
  inTime: string;
  outTime: string;
  remarks: string;
}

const StatsCards = () => {
  const [stats, setStats] = useState([
    {
      title: "Total Students",
      value: "0",
      change: "Loading...",
      icon: Users,
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      title: "Present Today",
      value: "0",
      change: "0% attendance",
      icon: CheckCircle,
      color: "text-present",
      bgColor: "bg-present/10"
    },
    {
      title: "Absent Today",
      value: "0",
      change: "0% absent",
      icon: AlertCircle,
      color: "text-absent",
      bgColor: "bg-absent/10"
    },
    {
      title: "Late Arrivals",
      value: "0",
      change: "0% late today",
      icon: Clock,
      color: "text-late",
      bgColor: "bg-late/10"
    }
  ]);

  const GOOGLE_SHEETS_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTqQoZ7x8QfBiKS_LLk5gGwebfBmKWKAy5mO5DRBfsrkzSfqKRMtXsWMpSCQrTfADKd6hUXKDOy8Ss5/pub?output=csv";

  const parseCSV = (csvText: string): AttendanceRecord[] => {
    const lines = csvText.trim().split('\n');
    
    return lines.slice(1).map(line => {
      const values = line.split(',');
      return {
        date: values[0]?.trim() || '',
        studentId: values[1]?.trim() || '',
        studentName: values[2]?.trim() || '',
        status: values[3]?.trim() || '',
        inTime: values[4]?.trim() || '',
        outTime: values[5]?.trim() || '',
        remarks: values[6]?.trim() || ''
      };
    }).filter(record => record.studentId);
  };

  const calculateStats = (records: AttendanceRecord[]) => {
    const today = new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD format
    const todayRecords = records.filter(record => record.date === today);
    
    // If no records for today, use the latest available date
    let relevantRecords = todayRecords;
    if (todayRecords.length === 0 && records.length > 0) {
      const latestDate = records.reduce((latest, record) => 
        record.date > latest ? record.date : latest, records[0].date);
      relevantRecords = records.filter(record => record.date === latestDate);
    }

    const uniqueStudents = new Set(records.map(record => record.studentId)).size;
    const presentToday = relevantRecords.filter(record => record.status === 'Present').length;
    const absentToday = relevantRecords.filter(record => record.status === 'Absent').length;
    const lateToday = relevantRecords.filter(record => 
      record.status === 'Present' && record.remarks?.toLowerCase().includes('late')).length;
    
    const totalToday = presentToday + absentToday;
    const attendanceRate = totalToday > 0 ? Math.round((presentToday / totalToday) * 100) : 0;
    const absentRate = totalToday > 0 ? Math.round((absentToday / totalToday) * 100) : 0;
    const lateRate = totalToday > 0 ? Math.round((lateToday / totalToday) * 100) : 0;

    return [
      {
        title: "Total Students",
        value: uniqueStudents.toString(),
        change: `${records.length} total records`,
        icon: Users,
        color: "text-primary",
        bgColor: "bg-primary/10"
      },
      {
        title: "Present Today",
        value: presentToday.toString(),
        change: `${attendanceRate}% attendance`,
        icon: CheckCircle,
        color: "text-present",
        bgColor: "bg-present/10"
      },
      {
        title: "Absent Today",
        value: absentToday.toString(),
        change: `${absentRate}% absent`,
        icon: AlertCircle,
        color: "text-absent",
        bgColor: "bg-absent/10"
      },
      {
        title: "Late Arrivals",
        value: lateToday.toString(),
        change: `${lateRate}% late today`,
        icon: Clock,
        color: "text-late",
        bgColor: "bg-late/10"
      }
    ];
  };

  const fetchAndCalculateStats = async () => {
    try {
      const response = await fetch(GOOGLE_SHEETS_CSV_URL);
      const csvText = await response.text();
      const records = parseCSV(csvText);
      const newStats = calculateStats(records);
      setStats(newStats);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  useEffect(() => {
    fetchAndCalculateStats();
    // Refresh stats every 5 seconds to match the attendance list refresh
    const interval = setInterval(fetchAndCalculateStats, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        
        return (
          <Card 
            key={index} 
            className="group relative overflow-hidden glass border-0 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Gradient background based on stat type */}
            <div className={`absolute inset-0 opacity-5 ${
              stat.color.includes('present') ? 'bg-gradient-success' :
              stat.color.includes('absent') ? 'bg-gradient-danger' :
              stat.color.includes('late') ? 'bg-gradient-warning' :
              'bg-gradient-primary'
            }`} />
            
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                {stat.title}
              </CardTitle>
              <div className={`relative p-3 rounded-xl ${stat.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                <IconComponent className={`h-5 w-5 ${stat.color} group-hover:drop-shadow-lg`} />
                
                {/* Glow effect on hover */}
                <div className={`absolute inset-0 rounded-xl ${
                  stat.color.includes('present') ? 'group-hover:shadow-success-glow' :
                  stat.color.includes('absent') ? 'group-hover:shadow-danger-glow' :
                  stat.color.includes('late') ? 'group-hover:shadow-warning-glow' :
                  'group-hover:shadow-glow'
                } transition-shadow duration-300`} />
              </div>
            </CardHeader>
            
            <CardContent className="space-y-2">
              <div className="flex items-baseline space-x-2">
                <div className="text-3xl font-bold font-inter text-foreground group-hover:scale-105 transition-transform duration-300">
                  {stat.value}
                </div>
                {stat.change.includes('%') && (
                  <div className={`text-sm font-medium px-2 py-1 rounded-full ${
                    stat.color.includes('present') ? 'bg-success/10 text-success' :
                    stat.color.includes('absent') ? 'bg-destructive/10 text-destructive' :
                    stat.color.includes('late') ? 'bg-warning/10 text-warning' :
                    'bg-primary/10 text-primary'
                  }`}>
                    {stat.change.split(' ')[0]}
                  </div>
                )}
              </div>
              
              <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                {stat.change}
              </p>
              
              {/* Animated progress bar */}
              <div className="h-1 bg-muted rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-1000 rounded-full ${
                    stat.color.includes('present') ? 'bg-gradient-success' :
                    stat.color.includes('absent') ? 'bg-gradient-danger' :
                    stat.color.includes('late') ? 'bg-gradient-warning' :
                    'bg-gradient-primary'
                  }`}
                  style={{ 
                    width: `${Math.min(parseInt(stat.change.match(/\d+/)?.[0] || '0'), 100)}%`,
                    animationDelay: `${index * 0.2}s`
                  }}
                />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default StatsCards;