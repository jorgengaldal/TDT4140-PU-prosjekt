import { Typography } from "@mui/material";


export default function CastList(movieData: any) {
    console.log(movieData)
  return (
    <div className="w-full relative inset-x-0 bottom-0 h-[55%] bg-[#202439]" >
      <div className="p-10">
        <Typography variant="h5" className="mb-4">
          Top Cast:
        </Typography>
        <div className="flex flex-row mb-3 space-x-4">
          {movieData?.movieData?.actors?.map((actor: any, index: number) => (
            <div key={index}>
              <div className="rounded-lg bg-transparent w-[150px] h-[calc(150px*25/17)] overflow-hidden mb-3">
                <img
                  src="https://m.media-amazon.com/images/M/MV5BMjExNzA4MDYxN15BMl5BanBnXkFtZTcwOTI1MDAxOQ@@._V1_.jpg"
                  alt="Movie Photo"
                  className="object-fill w-full h-full"
                />
              </div>
              <Typography>{actor}</Typography>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
