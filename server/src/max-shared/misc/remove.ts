

interface ListProps {
  pure: boolean
};

export const remove = (item: any, List: any, { pure }: ListProps) => {
  if (pure) {
    return List.filter((element: any) => ( element !== item));
  } else {
    const index = List.indexOf(item);
    if (index !== -1){
      List.splice(index, 1);
    }
    return List;
  }
};

export const removeByIndex = (index: number, List: any) => {
  if (index !== -1){
    List.splice(index, 1);
  }
  return List;
};
