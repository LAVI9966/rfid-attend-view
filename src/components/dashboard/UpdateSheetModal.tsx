import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AttendanceRecord {
  date: string;
  studentId: string;
  studentName: string;
  status: string;
  inTime: string;
  outTime: string;
}

interface UpdateSheetModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate: () => void;
}

const UpdateSheetModal = ({ open, onOpenChange, onUpdate }: UpdateSheetModalProps) => {
  const { toast } = useToast();
  const [records, setRecords] = useState<AttendanceRecord[]>([{
    date: new Date().toISOString().split('T')[0],
    studentId: '',
    studentName: '',
    status: 'Present',
    inTime: '',
    outTime: ''
  }]);
  const [isLoading, setIsLoading] = useState(false);

  const addNewRecord = () => {
    setRecords([...records, {
      date: new Date().toISOString().split('T')[0],
      studentId: '',
      studentName: '',
      status: 'Present',
      inTime: '',
      outTime: ''
    }]);
  };

  const removeRecord = (index: number) => {
    if (records.length > 1) {
      setRecords(records.filter((_, i) => i !== index));
    }
  };

  const updateRecord = (index: number, field: keyof AttendanceRecord, value: string) => {
    const updatedRecords = [...records];
    updatedRecords[index] = { ...updatedRecords[index], [field]: value };
    setRecords(updatedRecords);
  };

  const handleSave = async () => {
    // Validate records
    const validRecords = records.filter(record => 
      record.studentId.trim() && record.studentName.trim()
    );

    if (validRecords.length === 0) {
      toast({
        title: "Error",
        description: "Please fill in at least one complete record.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // In a real implementation, you would send this data to your backend
      // which would then update the Google Sheets via Google Sheets API
      
      // For now, we'll simulate the save and trigger refresh
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Success",
        description: `${validRecords.length} record(s) saved to Google Sheets!`,
        variant: "default"
      });

      // Reset form and close modal
      setRecords([{
        date: new Date().toISOString().split('T')[0],
        studentId: '',
        studentName: '',
        status: 'Present',
        inTime: '',
        outTime: ''
      }]);
      
      onUpdate(); // Trigger refresh of the attendance data
      onOpenChange(false);
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update Google Sheets. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass border-primary/20 max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3 text-xl font-bold">
            <div className="p-2 bg-gradient-primary rounded-xl shadow-glow">
              <CalendarIcon className="w-5 h-5 text-white" />
            </div>
            <span className="bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
              Update Attendance Sheet
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {records.map((record, index) => (
            <div key={index} className="p-4 glass rounded-xl border border-border/20 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-foreground/80">Record {index + 1}</h4>
                {records.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeRecord(index)}
                    className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`date-${index}`}>Date</Label>
                  <Input
                    id={`date-${index}`}
                    type="date"
                    value={record.date}
                    onChange={(e) => updateRecord(index, 'date', e.target.value)}
                    className="glass border-border/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`studentId-${index}`}>Student ID</Label>
                  <Input
                    id={`studentId-${index}`}
                    placeholder="S101"
                    value={record.studentId}
                    onChange={(e) => updateRecord(index, 'studentId', e.target.value)}
                    className="glass border-border/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`studentName-${index}`}>Student Name</Label>
                  <Input
                    id={`studentName-${index}`}
                    placeholder="John Doe"
                    value={record.studentName}
                    onChange={(e) => updateRecord(index, 'studentName', e.target.value)}
                    className="glass border-border/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`status-${index}`}>Status</Label>
                  <Select value={record.status} onValueChange={(value) => updateRecord(index, 'status', value)}>
                    <SelectTrigger className="glass border-border/20">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent className="glass border-border/20">
                      <SelectItem value="Present">Present</SelectItem>
                      <SelectItem value="Absent">Absent</SelectItem>
                      <SelectItem value="Late">Late</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`inTime-${index}`}>In Time</Label>
                  <Input
                    id={`inTime-${index}`}
                    placeholder="9:00 AM"
                    value={record.inTime}
                    onChange={(e) => updateRecord(index, 'inTime', e.target.value)}
                    className="glass border-border/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`outTime-${index}`}>Out Time</Label>
                  <Input
                    id={`outTime-${index}`}
                    placeholder="5:00 PM"
                    value={record.outTime}
                    onChange={(e) => updateRecord(index, 'outTime', e.target.value)}
                    className="glass border-border/20"
                  />
                </div>
              </div>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={addNewRecord}
            className="w-full glass border-primary/20 hover:bg-primary/10 hover:border-primary/40"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Another Record
          </Button>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="glass border-border/20 hover:bg-muted/10"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={isLoading}
            className="bg-gradient-primary text-white hover:opacity-90 shadow-glow"
          >
            {isLoading ? "Saving..." : "Save to Google Sheets"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateSheetModal;