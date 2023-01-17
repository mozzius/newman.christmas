import { type Player } from "@prisma/client";

const genColour = (seed: number) =>
  Math.floor(Math.abs(Math.sin(seed) * 16777215)).toString(16);

interface Props {
  empires: (Player & {
    subjects: Player[];
  })[];
  id: number;
}

export const Empire = ({ empires, id }: Props) => {
  const empire = empires.find((x) => x.id === id);
  if (!empire) throw Error("id not in empires");

  return (
    <div
      className="mt-4 w-full rounded border p-2"
      style={{ backgroundColor: genColour(id) }}
    >
      <p className="text-white">{empire.name}</p>
      {empire.subjects.length > 0 && (
        <div className="mt-2 pl-4">
          {empire.subjects.map((subject) => (
            <Empire id={subject.id} empires={empires} key={subject.id} />
          ))}
        </div>
      )}
    </div>
  );
};
