"use client";

import PageModal from "@/components/ui/page-modal";
import { useProfileModal } from "@/hooks/use-profile-modal";

const ProfileModal = () => {
  const profileModal = useProfileModal();
  return (
    <PageModal isOpen={profileModal.isOpen} onClose={profileModal.onClose}>
      <div className="overflow-y-auto max-h-[80vh]">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi
          eligendi repellat ducimus perspiciatis adipisci odio id suscipit cum
          quod ipsam consequatur, modi illo accusantium inventore molestiae quo
          libero mollitia. Quisquam perspiciatis nostrum dolores libero dolorem
          error atque reiciendis debitis! Molestiae laudantium architecto quae
          similique, voluptatibus, dolor rerum ea est aliquid a quia quos
          aperiam expedita dignissimos vitae voluptatem molestias nesciunt.
          Dolores pariatur reiciendis facere eos assumenda, excepturi porro,
          ipsam rem quod quae aliquam reprehenderit nobis? Sit, quos. Minima
          perspiciatis eius sed architecto consequatur quas voluptate quod
          delectus perferendis odit dolorem dignissimos, corporis, officiis quo.
          Blanditiis nobis omnis provident cupiditate exercitationem. Lorem
          ipsum dolor, sit amet consectetur adipisicing elit. Dolores
          necessitatibus ab vel ex perferendis cum, eum porro dolorem
          voluptatibus iste adipisci quae rerum quidem praesentium! Quia
          consequatur itaque dolor officiis?
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi
          eligendi repellat ducimus perspiciatis adipisci odio id suscipit cum
          quod ipsam consequatur, modi illo accusantium inventore molestiae quo
          libero mollitia. Quisquam perspiciatis nostrum dolores libero dolorem
          error atque reiciendis debitis! Molestiae laudantium architecto quae
          similique, voluptatibus, dolor rerum ea est aliquid a quia quos
          aperiam expedita dignissimos vitae voluptatem molestias nesciunt.
          Dolores pariatur reiciendis facere eos assumenda, excepturi porro,
          ipsam rem quod quae aliquam reprehenderit nobis? Sit, quos. Minima
          perspiciatis eius sed architecto consequatur quas voluptate quod
          delectus perferendis odit dolorem dignissimos, corporis, officiis quo.
          Blanditiis nobis omnis provident cupiditate exercitationem. Lorem
          ipsum dolor, sit amet consectetur adipisicing elit. Dolores
          necessitatibus ab vel ex perferendis cum, eum porro dolorem
          voluptatibus iste adipisci quae rerum quidem praesentium! Quia
          consequatur itaque dolor officiis?
        </p>
      </div>
    </PageModal>
  );
};

export default ProfileModal;
