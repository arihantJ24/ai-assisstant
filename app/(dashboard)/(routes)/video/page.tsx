"use client";

import { Heading } from "@/components/heading";
import { Form , FormField , FormItem , FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { useProModal } from "@/hooks/use-pro-modal";
    
import axios from "axios";
import * as z from "zod"; 
import { VideoIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


import { formSchema } from "./constants";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";



const VideoPage = () => {
  const proModal = useProModal();
  const router = useRouter();
  const [video, setVideo] = useState<string>();

    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        prompt: "",
      },
    });

    const isLoading = form.formState.isSubmitting;
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
      try {
        setVideo(undefined);
        const response = await axios.post("/api/video", values);
        console.log(response);

        setVideo(response.data[0]);
        form.reset();

      } catch (error: any) {
        // todo open pro modal 
        if (error?.response?.status === 403) {
          proModal.onOpen();
        } else {
          toast.error("something went Wrong!!");
        }
        
      } finally {
        router.refresh();
        }
    };


    return (
      <div>
        <Heading
          title="Video Generation"
          description="Bringing imagination to life through dynamic visuals."
          icon={VideoIcon}
          iconColor="text-orange-700"
          bgColor="bg-orange-700/10"
        />
        <div className="px-4 lg:px-8">
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="
                rounded-lg 
                border 
                w-full 
                p-4 
                px-3 
                md:px-6 
                focus-within:shadow-sm
                grid
                grid-cols-12
                gap-2
              "
              >
                <FormField
                  name="prompt"
                  render={({ field }) => (
                    <FormItem className="col-span-12 lg:col-span-10">
                      <FormControl className="m-0 p-0">
                        <Input
                          className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                          disabled={isLoading}
                          placeholder="Creating symphonies from the heart of algorithms"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button
                  className="col-span-12 lg:col-span-2 w-full"
                  type="submit"
                  disabled={isLoading}
                  size="icon"
                >
                  Generate
                </Button>
              </form>
            </Form>
          </div>
          <div className="space-y-4 mt-4">
            {isLoading && (
              <div className="p-20">
                <Loader />
              </div>
            )}
            {!video && !isLoading && <Empty label="No Video generated." />}
            {video && (
              <video className="w-full aspect-video mt-8 rounded-lg border bg-black " controls>
                
                <source src={video} />
              </video>
            )}
          </div>
        </div>
      </div>
    );
}
 
export default VideoPage;