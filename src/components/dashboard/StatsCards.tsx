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
    // Refresh stats every 30 seconds to match the attendance list refresh
    const interval = setInterval(fetchAndCalculateStats, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        
        return (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`${stat.bgColor} p-2 rounded-lg`}>
                <IconComponent className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.change}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default StatsCards;