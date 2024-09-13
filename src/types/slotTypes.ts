/*
 * Created by Asad on 12 Sep 2024
 */

interface Slot {
  id: number;
  title: string;
  imageUri: string | null;
}

interface JobListItemProps {
  title: string;
  imageUri?: string;
  onPress: () => void;
}
