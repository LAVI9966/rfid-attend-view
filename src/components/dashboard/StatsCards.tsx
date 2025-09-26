import { Users, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import axios from "axios";

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
      // Update backend URL to use the new endpoint
      const response = await axios.get<AttendanceRecord[]>("https://rfid-backend-q0hl.onrender.com/attendance");
      const records = response.data;
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
    <Card className="group glass border border-border/30 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/20">
        <CardTitle className="flex items-center space-x-3 text-lg font-semibold">
          <div className="p-2 bg-primary rounded-lg shadow">
            <Users className="w-5 h-5 text-white" />
          </div>
          <span className="text-primary">Attendance Statistics</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 flex space-x-4 justify-between">
        {stats.map((stat, index) => (
          <div key={index} className={`flex flex-col items-center justify-between p-4 rounded-lg ${stat.bgColor} shadow-md hover:shadow-lg transition-all duration-300 w-1/4`}>
            <stat.icon className={`w-6 h-6 ${stat.color}`} />
            <div className="text-center mt-2">
              <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
              <p className="text-lg font-bold text-foreground">{stat.value}</p>
            </div>
            <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default StatsCards;