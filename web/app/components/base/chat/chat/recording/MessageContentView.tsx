import LoadingAnim from "@/app/components/app/chat/loading-anim";
import { ChatItem } from "../../types";
import AgentContent from "../answer/agent-content";
import BasicContent from "../answer/basic-content";


interface ViewProps {
    item: ChatItem;
    responding?: boolean;

}

export default function MessageContentView(props: ViewProps) {
    const {
        item,
        responding
    } = props;

    const {
        content,
        citation,
        agent_thoughts,
        more,
        annotation,
        workflowProcess,
    } = item

    const hasAgentThoughts = !!agent_thoughts?.length
    return (
        <>
            {
                responding && !content && (
                    <div className='flex items-center justify-center w-6 h-5'>
                        <LoadingAnim type='text' />
                    </div>
                )
            }
            {
                content && !hasAgentThoughts && (
                    <BasicContent item={item} />
                )
            }
            {
                hasAgentThoughts && (
                    <AgentContent
                        item={item}
                        responding={responding}
                    />
                )
            }
        </>
    );
}
